import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cloud,
  Droplets,
  Wind,
  Sun,
  BookOpen,
  DollarSign,
  User,
} from "lucide-react";
import WeatherDashboard from "./WeatherDashboard";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* App Header */}
      <header className="sticky top-0 z-10 bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">AgriSuro</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6 overflow-auto pb-20">
        {/* Weather Dashboard */}
        <section>
          <WeatherDashboard />
        </section>

        {/* Quick Access Cards */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Rice Encyclopedia Card */}
            <Link to="/encyclopedia">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Rice Encyclopedia
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription>
                    Explore rice variants, diseases, weeds, and more
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-primary"
                  >
                    Open
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Expense Tracker Card */}
            <Link to="/expenses">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary" />
                    Expense Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <CardDescription>
                    Log and manage your farming expenses
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-primary"
                  >
                    Open
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Droplets className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Weather Alert</p>
                    <p className="text-sm text-muted-foreground">
                      Heavy rainfall expected in the next 48 hours
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Today, 10:30 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Rice Encyclopedia</p>
                    <p className="text-sm text-muted-foreground">
                      You viewed information about Brown Spot disease
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Yesterday, 3:45 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Expense Added</p>
                    <p className="text-sm text-muted-foreground">
                      Added ₱1,500 for fertilizer purchase
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      2 days ago, 9:15 AM
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around items-center">
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1"
          asChild
        >
          <Link to="/">
            <Sun className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1"
          asChild
        >
          <Link to="/encyclopedia">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs mt-1">Encyclopedia</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1"
          asChild
        >
          <Link to="/expenses">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs mt-1">Expenses</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center h-auto py-1"
          asChild
        >
          <Link to="/profile">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </Button>
      </nav>
    </div>
  );
};

export default Home;
