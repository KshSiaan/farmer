"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import {
  Droplet,
  Thermometer,
  Cloud,
  TrendingUp,
  MapPin,
  Crop,
  LayoutGrid,
} from "lucide-react";
import { getFetcher } from "@/lib/simplifier";
import { useCookies } from "react-cookie";

interface Farm {
  id: number;
  farm_name: string;
  location: string;
  size: string;
  crop_type: string;
  crop_status: string;
  operational_costs: string;
}

interface MonitoringData {
  id: number;
  temperature: string;
  soil_moisture: string;
  rainfall: string;
  yield_prediction: string;
  farm_status: string;
  created_at: string;
  farm: Farm;
}

interface FarmResponse {
  status: boolean;
  message: string;
  data: {
    data: Farm[];
  };
}

interface MonitoringResponse {
  status: boolean;
  message: string;
  data: {
    data: MonitoringData[];
  };
}

export default function Dashboard() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>("");
  const [monitoringData, setMonitoringData] = useState<MonitoringData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["token"]);
  // Fetch farms on component mount
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await getFetcher({
          link: "/farms",
          token: cookies.token, // Replace with actual token retrieval
        });
        console.log(response);

        const farmResponse = response as FarmResponse;

        if (farmResponse.status && farmResponse.data.data.length > 0) {
          setFarms(farmResponse.data.data);
          setSelectedFarmId(farmResponse.data.data[0].id.toString());
        } else {
          setError("No farms found");
        }
      } catch (err) {
        // setError("Failed to fetch farms");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, []);

  // Fetch monitoring data when selected farm changes
  useEffect(() => {
    if (!selectedFarmId) return;

    const fetchMonitoringData = async () => {
      setLoading(true);
      try {
        const response = await getFetcher({
          link: `/get-monitoring/${selectedFarmId}`,
          token: cookies.token, // Replace with actual token retrieval
        });

        const monitoringResponse = response as MonitoringResponse;

        if (monitoringResponse.status) {
          setMonitoringData(monitoringResponse.data.data);
        } else {
          setError("No monitoring data found");
        }
      } catch (err) {
        setError("Failed to fetch monitoring data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonitoringData();
  }, [selectedFarmId]);

  // Get the latest monitoring data
  const latestData = monitoringData.length > 0 ? monitoringData[0] : null;

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  // Get crop status badge variant
  const getCropStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "invested":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container !mx-auto !p-4 !space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Farm Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor and analyze your farm data in real-time
          </p>
        </div>

        <div className="w-full md:w-64">
          <Select
            value={selectedFarmId}
            onValueChange={setSelectedFarmId}
            disabled={loading || farms.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a farm" />
            </SelectTrigger>
            <SelectContent>
              {farms.map((farm) => (
                <SelectItem key={farm.id} value={farm.id.toString()}>
                  {farm.farm_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : latestData ? (
        <Tabs defaultValue="overview" className="!space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Farm Details</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="!space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader className="!pb-2">
                <CardTitle>Farm Status</CardTitle>
                <CardDescription>Current status of your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-4 h-4 rounded-full ${getStatusColor(
                      latestData.farm_status
                    )}`}
                  ></div>
                  <div className="font-medium capitalize">
                    {latestData.farm_status}
                  </div>
                  <div className="text-muted-foreground text-sm 1ml-auto">
                    {/* Last updated: {formatDate(latestData.updated_at)} */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Temperature Card */}
              <Card>
                <CardHeader className="!pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Temperature</CardTitle>
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData.temperature}°C
                  </div>
                  <p className="text-xs text-muted-foreground !mt-1">
                    Optimal range: 20-30°C
                  </p>
                </CardContent>
              </Card>

              {/* Soil Moisture Card */}
              <Card>
                <CardHeader className="1pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Soil Moisture</CardTitle>
                    <Droplet className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData.soil_moisture}%
                  </div>
                  <p className="text-xs text-muted-foreground !mt-1">
                    Optimal range: 60-80%
                  </p>
                </CardContent>
              </Card>

              {/* Rainfall Card */}
              <Card>
                <CardHeader className="!pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Rainfall</CardTitle>
                    <Cloud className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData.rainfall} mm
                  </div>
                  <p className="text-xs text-muted-foreground !mt-1">
                    Last 24 hours
                  </p>
                </CardContent>
              </Card>

              {/* Yield Prediction Card */}
              <Card>
                <CardHeader className="!pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Yield Prediction
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestData.yield_prediction} kg
                  </div>
                  <p className="text-xs text-muted-foreground !mt-1">
                    Estimated harvest
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="!space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{latestData.farm.farm_name}</CardTitle>
                <CardDescription>
                  Detailed information about your farm
                </CardDescription>
              </CardHeader>
              <CardContent className="!space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="!space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Location:</span>
                      <span>{latestData.farm.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Size:</span>
                      <span>{latestData.farm.size} acres</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Crop className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Crop Type:</span>
                      <span>{latestData.farm.crop_type}</span>
                    </div>
                  </div>

                  <div className="!space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Crop Status:</span>
                      <Badge
                        className={getCropStatusVariant(
                          latestData.farm.crop_status
                        )}
                      >
                        {latestData.farm.crop_status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Operational Costs:</span>
                      <span>
                        {latestData.farm.operational_costs
                          ? `$${latestData.farm.operational_costs}`
                          : "Not available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-medium">Farmer:</span>
                      {/* <span>{latestData.farm.farmer.name}</span> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="!space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring History</CardTitle>
                <CardDescription>
                  Past monitoring data for this farm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="!space-y-4">
                  {monitoringData.map((data) => (
                    <div
                      key={data.id}
                      className="!p-4 border rounded-lg flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            data.farm_status
                          )}`}
                        ></div>
                        <span className="font-medium capitalize">
                          {data.farm_status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span>{data.temperature}°C</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Droplet className="h-4 w-4 text-muted-foreground" />
                          <span>{data.soil_moisture}%</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Cloud className="h-4 w-4 text-muted-foreground" />
                          <span>{data.rainfall} mm</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span>{data.yield_prediction} kg</span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {formatDate(data.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">No monitoring data available</p>
        </div>
      )}
    </div>
  );
}
