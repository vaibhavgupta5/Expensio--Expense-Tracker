"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";


const chartConfig = {
  amount: {
    label: "",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TripGraph() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    async function fetchTrips() {
      try {
        const result = await axios.get("/api/wishlist");

        const data = result.data.data.map((item: any) => ({
          date: new Date(item.createdAt).toLocaleDateString("en-US"),
          amount: item.amount,
        }));

        setChartData(data.reverse());
      } catch (error) {
        console.error("Error fetching trips data:", error);
      }
    }

    fetchTrips();
  }, []);

  return (
    <Card className="w-full h-full bg-transparent border-none">
      <CardContent className=" h-full content-center sm:p-2">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[160px] er w-full "
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="amount" fill={`white`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
