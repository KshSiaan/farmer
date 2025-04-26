"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { InvestmentType } from "@/types/itemTypes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Landmark, User, Clock, DollarSignIcon, Percent } from "lucide-react";

export default function ViewInvestor({ data }: { data: InvestmentType }) {
  //   // Format currency
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number.parseFloat(amount));
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="farm">View</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Investment Details
          </DialogTitle>
        </DialogHeader>

        {/* Investment Summary */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Investment #{data.id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Created {formatDate(data.created_at)}
              </span>
            </div>
          </div>
          <Badge className={getStatusColor(data.invest_status)}>
            {data.invest_status}
          </Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Investor Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <User className="h-5 w-5" />
                Investor Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{data.investor.name}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{data.investor.name || "N/A"}</p>
                  <p className="font-medium">{data.investor || "N/A"}</p>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Farm Information */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                Farm Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Farm Name</p>
                  <p className="font-medium">{data.farm.farm_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{data.farm.location || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Farm Type</p>
                  <p className="font-medium">{data.farm.farm_name || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Details */}
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center gap-2">
              <DollarSignIcon className="h-5 w-5" />
              Financial Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Investment Amount</p>
                <p className="text-xl font-bold">
                  {formatCurrency(data.amount)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Profit Share</p>
                <p className="text-xl font-bold flex items-center">
                  {data.profit_share}
                  <Percent className="h-4 w-4 ml-1" />
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm font-medium">
                  {formatDate(data.updated_at)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flexstify-end mt-6">
          <Button variant="outline" className="mr-2">
            Close
          </Button>
          <Button>Download Details</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
