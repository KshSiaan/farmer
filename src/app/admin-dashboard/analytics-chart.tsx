"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AnalyticsChart() {
  // Generate psychologically appealing dummy data
  const generateAppealingData = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();

    // Get the last 12 months in order
    const lastTwelveMonths = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (currentMonth - 11 + i) % 12;
      return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
    });

    // Starting values
    const startUsers = 42;
    const startFarms = 15;
    const startInvestors = 8;

    // End values (significantly higher to show growth)
    const endUsers = 187;
    const endFarms = 68;
    const endInvestors = 37;

    return lastTwelveMonths.map((month, index) => {
      // Base growth pattern (non-linear, accelerating growth looks more impressive)
      const growthFactor = Math.pow((index + 1) / 12, 1.2);

      // Create some strategic dips and recoveries for narrative
      let userModifier = 1;
      let farmModifier = 1;
      let investorModifier = 1;

      // Strategic dip for users around month 4-5 followed by strong recovery
      if (index === 4) userModifier = 0.92;
      if (index === 5) userModifier = 0.94;
      if (index === 6) userModifier = 1.08;

      // Small dip for farms around month 7-8
      if (index === 7) farmModifier = 0.95;
      if (index === 8) farmModifier = 0.97;
      if (index === 9) farmModifier = 1.06;

      // Investors show steady growth with a small acceleration at the end
      if (index >= 9) investorModifier = 1.05;

      // Calculate values with modifiers
      const users = Math.round(
        (startUsers + (endUsers - startUsers) * growthFactor) * userModifier
      );
      const farms = Math.round(
        (startFarms + (endFarms - startFarms) * growthFactor) * farmModifier
      );
      const investors = Math.round(
        (startInvestors + (endInvestors - startInvestors) * growthFactor) *
          investorModifier
      );

      return {
        month,
        users,
        farms,
        investors,
      };
    });
  };

  const timeSeriesData = generateAppealingData();

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeSeriesData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis
            dataKey="month"
            padding={{ left: 10, right: 10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} width={40} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            name="Users"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#2563eb" }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="farms"
            name="Farms"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, fill: "#10b981", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#10b981" }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="investors"
            name="Investors"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#f59e0b" }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
