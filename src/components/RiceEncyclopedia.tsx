import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Camera, Info, Leaf, Bug, FlaskConical } from "lucide-react";
import IdentificationTool from "./IdentificationTool";

const RiceEncyclopedia = ({ onIdentifyClick = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("variants");
  const [showIdentificationTool, setShowIdentificationTool] = useState(false);

  // Mock data for rice variants
  const riceVariants = [
    {
      id: 1,
      name: "NSIC Rc 222",
      image:
        "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80",
      description: "High-yielding variety with good eating quality",
      maturityDays: "110-115 days",
      averageYield: "6.0 tons/ha",
      resistanceTo: "Blast, Bacterial Leaf Blight",
    },
    {
      id: 2,
      name: "NSIC Rc 160",
      image:
        "https://images.unsplash.com/photo-1626016750647-215e49b44fc7?w=400&q=80",
      description: "Drought-tolerant variety suitable for rainfed areas",
      maturityDays: "105-110 days",
      averageYield: "5.5 tons/ha",
      resistanceTo: "Blast, Brown Planthopper",
    },
    {
      id: 3,
      name: "NSIC Rc 216",
      image:
        "https://images.unsplash.com/photo-1602595888166-0b5809a3a0a1?w=400&q=80",
      description: "Saline-tolerant variety for coastal areas",
      maturityDays: "112-118 days",
      averageYield: "5.8 tons/ha",
      resistanceTo: "Blast, Bacterial Leaf Blight, Saline conditions",
    },
  ];

  // Mock data for rice diseases
  const riceDiseases = [
    {
      id: 1,
      name: "Rice Blast",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description: "Fungal disease causing diamond-shaped lesions on leaves",
      symptoms: "Diamond-shaped lesions with gray centers and brown margins",
      treatment: "Fungicides containing tricyclazole or propiconazole",
    },
    {
      id: 2,
      name: "Bacterial Leaf Blight",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description:
        "Bacterial disease causing yellow to white lesions on leaves",
      symptoms: "Yellow to white lesions along leaf margins",
      treatment: "Copper-based bactericides, resistant varieties",
    },
    {
      id: 3,
      name: "Sheath Blight",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description: "Fungal disease affecting leaf sheaths and leaves",
      symptoms:
        "Irregular lesions on leaf sheaths with gray centers and brown borders",
      treatment: "Fungicides containing hexaconazole or validamycin",
    },
  ];

  // Mock data for rice weeds
  const riceWeeds = [
    {
      id: 1,
      name: "Barnyard Grass",
      image:
        "https://images.unsplash.com/photo-1635255315426-b8b4b6c1b7d1?w=400&q=80",
      description: "Common grass weed in rice fields",
      controlMethods: "Pre-emergence herbicides, proper water management",
    },
    {
      id: 2,
      name: "Water Hyacinth",
      image:
        "https://images.unsplash.com/photo-1635255315426-b8b4b6c1b7d1?w=400&q=80",
      description: "Floating aquatic weed that blocks irrigation",
      controlMethods: "Mechanical removal, biological control agents",
    },
    {
      id: 3,
      name: "Sedges",
      image:
        "https://images.unsplash.com/photo-1635255315426-b8b4b6c1b7d1?w=400&q=80",
      description: "Grass-like weeds with triangular stems",
      controlMethods: "Selective herbicides, proper land preparation",
    },
  ];

  // Mock data for fertilizers and pesticides
  const fertilizersAndPesticides = [
    {
      id: 1,
      name: "Complete NPK (14-14-14)",
      type: "Fertilizer",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description:
        "Balanced fertilizer with equal parts nitrogen, phosphorus, and potassium",
      applicationRate: "5-7 bags/ha depending on soil analysis",
      timing: "Basal application and 30 days after transplanting",
    },
    {
      id: 2,
      name: "Cypermethrin",
      type: "Pesticide",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description:
        "Broad-spectrum insecticide for controlling various rice pests",
      applicationRate: "25-50 ml per 16L knapsack sprayer",
      safetyPrecautions:
        "Wear protective clothing, avoid spraying during windy conditions",
    },
    {
      id: 3,
      name: "Urea (46-0-0)",
      type: "Fertilizer",
      image:
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80",
      description: "High-nitrogen fertilizer for promoting vegetative growth",
      applicationRate: "2-3 bags/ha split into multiple applications",
      timing: "Top-dressing at tillering and panicle initiation stages",
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleIdentifyClick = () => {
    setShowIdentificationTool(true);
    onIdentifyClick();
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    setShowIdentificationTool(false);
  };

  const filteredVariants = riceVariants.filter(
    (variant) =>
      variant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      variant.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredDiseases = riceDiseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredWeeds = riceWeeds.filter(
    (weed) =>
      weed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      weed.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredProducts = fertilizersAndPesticides.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search rice encyclopedia..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {(activeTab === "diseases" || activeTab === "weeds") && (
            <Button
              onClick={handleIdentifyClick}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Identify
            </Button>
          )}
        </div>

        {showIdentificationTool ? (
          <IdentificationTool
            type={activeTab === "diseases" ? "disease" : "weed"}
            onClose={() => setShowIdentificationTool(false)}
          />
        ) : (
          <Tabs
            defaultValue="variants"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="variants" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                Variants
              </TabsTrigger>
              <TabsTrigger value="diseases" className="flex items-center gap-1">
                <Bug className="h-4 w-4" />
                Diseases
              </TabsTrigger>
              <TabsTrigger value="weeds" className="flex items-center gap-1">
                <Leaf className="h-4 w-4" />
                Weeds
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-1">
                <FlaskConical className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[500px] pr-4">
              <TabsContent value="variants" className="space-y-4">
                {filteredVariants.length > 0 ? (
                  filteredVariants.map((variant) => (
                    <Card key={variant.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={variant.image}
                            alt={variant.name}
                            className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <CardTitle>{variant.name}</CardTitle>
                            <CardDescription>
                              {variant.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-sm font-medium">Maturity:</p>
                                <p className="text-sm">
                                  {variant.maturityDays}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Average Yield:
                                </p>
                                <p className="text-sm">
                                  {variant.averageYield}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-sm font-medium">
                                  Resistance:
                                </p>
                                <p className="text-sm">
                                  {variant.resistanceTo}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View Planting Guidelines
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No rice variants found matching your search.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="diseases" className="space-y-4">
                {filteredDiseases.length > 0 ? (
                  filteredDiseases.map((disease) => (
                    <Card key={disease.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={disease.image}
                            alt={disease.name}
                            className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <CardTitle>{disease.name}</CardTitle>
                            <CardDescription>
                              {disease.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium">Symptoms:</p>
                                <p className="text-sm">{disease.symptoms}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  Treatment:
                                </p>
                                <p className="text-sm">{disease.treatment}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View Treatment Options
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No rice diseases found matching your search.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="weeds" className="space-y-4">
                {filteredWeeds.length > 0 ? (
                  filteredWeeds.map((weed) => (
                    <Card key={weed.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={weed.image}
                            alt={weed.name}
                            className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <CardTitle>{weed.name}</CardTitle>
                            <CardDescription>
                              {weed.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div>
                              <p className="text-sm font-medium">
                                Control Methods:
                              </p>
                              <p className="text-sm">{weed.controlMethods}</p>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View Control Methods
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No rice weeds found matching your search.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Card key={product.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <CardTitle>{product.name}</CardTitle>
                              <span
                                className={`px-2 py-1 rounded text-xs ${product.type === "Fertilizer" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                              >
                                {product.type}
                              </span>
                            </div>
                            <CardDescription>
                              {product.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div>
                                <p className="text-sm font-medium">
                                  Application Rate:
                                </p>
                                <p className="text-sm">
                                  {product.applicationRate}
                                </p>
                              </div>
                              {product.timing && (
                                <div>
                                  <p className="text-sm font-medium">Timing:</p>
                                  <p className="text-sm">{product.timing}</p>
                                </div>
                              )}
                              {product.safetyPrecautions && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Safety Precautions:
                                  </p>
                                  <p className="text-sm">
                                    {product.safetyPrecautions}
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              View Application Guidelines
                            </Button>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No products found matching your search.
                    </p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default RiceEncyclopedia;
