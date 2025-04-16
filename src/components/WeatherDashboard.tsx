import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  CloudRain,
  Droplets,
  Share2,
  Sun,
  Wind,
  Save,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    rainfall: number;
  };
  forecast: Array<{
    day: string;
    temperature: number;
    condition: string;
    rainfall: number;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
  }>;
}

const WeatherDashboard = ({ weatherData = defaultWeatherData }) => {
  const [activeTab, setActiveTab] = useState("current");

  // Function to determine weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  // Function to determine priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Weather Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          Last updated: Today, 10:30 AM
        </div>
      </div>

      <Tabs
        defaultValue="current"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Current Conditions</CardTitle>
                {getWeatherIcon(weatherData.current.condition)}
              </div>
              <CardDescription>{weatherData.current.condition}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  <span>Temperature: {weatherData.current.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <span>Humidity: {weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-500" />
                  <span>Wind: {weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="h-5 w-5 text-blue-500" />
                  <span>Rainfall: {weatherData.current.rainfall} mm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Farming Recommendations
            </h3>
            {weatherData.recommendations.map((recommendation) => (
              <Card key={recommendation.id} className="mb-3">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">
                      {recommendation.title}
                    </CardTitle>
                    <Badge
                      variant={getPriorityColor(recommendation.priority) as any}
                    >
                      {recommendation.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{recommendation.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {weatherData.forecast.map((day, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {getWeatherIcon(day.condition)}
                  <p className="mt-2 font-medium">{day.temperature}°C</p>
                  <p className="text-sm text-muted-foreground">
                    {day.condition}
                  </p>
                  <div className="flex items-center justify-center mt-2 text-sm">
                    <CloudRain className="h-4 w-4 text-blue-500 mr-1" />
                    <span>{day.rainfall} mm</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base">Weather Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Heavy rainfall expected on Thursday. Consider delaying
                fertilizer application and ensure proper drainage in your rice
                fields.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Default mock data
const defaultWeatherData: WeatherData = {
  current: {
    temperature: 32,
    humidity: 75,
    windSpeed: 8,
    condition: "Cloudy",
    rainfall: 0.5,
  },
  forecast: [
    { day: "Today", temperature: 32, condition: "Cloudy", rainfall: 0.5 },
    { day: "Tomorrow", temperature: 33, condition: "Sunny", rainfall: 0 },
    { day: "Wednesday", temperature: 31, condition: "Cloudy", rainfall: 2 },
    { day: "Thursday", temperature: 29, condition: "Rainy", rainfall: 15 },
    { day: "Friday", temperature: 30, condition: "Cloudy", rainfall: 5 },
  ],
  recommendations: [
    {
      id: "1",
      title: "Irrigation Management",
      description:
        "With light rainfall expected today, reduce irrigation to prevent waterlogging. Monitor soil moisture levels closely.",
      priority: "medium",
    },
    {
      id: "2",
      title: "Pest Control Alert",
      description:
        "Current humid conditions are favorable for rice blast disease. Consider preventive fungicide application within the next 48 hours.",
      priority: "high",
    },
    {
      id: "3",
      title: "Fertilizer Application",
      description:
        "Sunny conditions tomorrow provide an ideal window for nitrogen fertilizer application. Apply early morning for best results.",
      priority: "medium",
    },
  ],
};

export default WeatherDashboard;
