import React, { useState } from "react";
import { Camera, Upload, Search, X, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IdentificationResult {
  name: string;
  confidence: number;
  description: string;
  treatment: string;
  imageUrl: string;
}

interface IdentificationToolProps {
  type?: "disease" | "weed";
  onIdentificationComplete?: (result: IdentificationResult | null) => void;
}

const IdentificationTool = ({
  type = "disease",
  onIdentificationComplete = () => {},
}: IdentificationToolProps) => {
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Mock identification results for demo purposes
  const mockResults: Record<string, IdentificationResult> = {
    disease: {
      name: "Rice Blast",
      confidence: 92,
      description:
        "Rice blast is caused by the fungus Magnaporthe oryzae. It affects all above ground parts of the rice plant: leaf, collar, node, neck, parts of panicle, and sometimes leaf sheath.",
      treatment:
        "Use resistant varieties, avoid excessive nitrogen application, apply fungicides like Tricyclazole or Isoprothiolane at recommended doses.",
      imageUrl:
        "https://images.unsplash.com/photo-1585513428101-be1f03c62c61?w=800&q=80",
    },
    weed: {
      name: "Barnyard Grass",
      confidence: 88,
      description:
        "Barnyard grass (Echinochloa crus-galli) is a major weed in rice fields. It competes with rice for nutrients, light, and space, reducing yields by up to 50% if not controlled.",
      treatment:
        "Pre-emergence herbicides like Butachlor or Pretilachlor, hand weeding at early stages, and maintaining proper water levels in paddy fields.",
      imageUrl:
        "https://images.unsplash.com/photo-1530348908325-1e106f529a3f?w=800&q=80",
    },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would access the device camera
    // For demo purposes, we'll use a placeholder image
    setImagePreview(
      "https://images.unsplash.com/photo-1602513445803-d2fe5a35d25c?w=800&q=80",
    );
  };

  const analyzeImage = () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setResult(mockResults[type]);
      setIsAnalyzing(false);
      setShowResult(true);
      onIdentificationComplete(mockResults[type]);
    }, 2000);
  };

  const resetIdentification = () => {
    setImagePreview(null);
    setResult(null);
    setShowResult(false);
    onIdentificationComplete(null);
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg border border-border">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {type === "disease"
                ? "Disease Identification"
                : "Weed Identification"}
            </span>
            <Badge variant="outline" className="ml-2">
              AI Powered
            </Badge>
          </CardTitle>
          <CardDescription>
            {type === "disease"
              ? "Take or upload a photo of affected rice plants for identification and treatment options."
              : "Take or upload a photo of weeds in your field for identification and control methods."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Camera
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="mt-4">
              <div className="flex flex-col items-center justify-center">
                {!imagePreview ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 w-full">
                    <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Take a clear photo of the{" "}
                      {type === "disease" ? "affected plant" : "weed"}
                    </p>
                    <Button onClick={handleCameraCapture}>Capture Photo</Button>
                  </div>
                ) : (
                  <div className="w-full">
                    <AspectRatio
                      ratio={4 / 3}
                      className="bg-muted rounded-md overflow-hidden"
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={resetIdentification}>
                        <X className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                      <Button onClick={analyzeImage} disabled={isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Analyze
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
              <div className="flex flex-col items-center justify-center">
                {!imagePreview ? (
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 w-full cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Click to upload or drag and drop
                      <br />
                      PNG, JPG or JPEG (max. 10MB)
                    </p>
                    <Button variant="secondary" type="button">
                      Select Image
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="w-full">
                    <AspectRatio
                      ratio={4 / 3}
                      className="bg-muted rounded-md overflow-hidden"
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={resetIdentification}>
                        <X className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                      <Button onClick={analyzeImage} disabled={isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Analyze
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <span className="mr-2">{result?.name}</span>
              <Badge variant="outline">{result?.confidence}% Match</Badge>
            </DialogTitle>
            <DialogDescription>
              {type === "disease"
                ? "Disease identified with treatment options"
                : "Weed identified with control methods"}
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="grid gap-4">
              <AspectRatio
                ratio={16 / 9}
                className="bg-muted rounded-md overflow-hidden"
              >
                <img
                  src={result.imageUrl}
                  alt={result.name}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>

              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2" />
                  Description
                </h4>
                <ScrollArea className="h-24 rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    {result.description}
                  </p>
                </ScrollArea>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Check className="h-4 w-4 mr-2" />
                  {type === "disease" ? "Treatment" : "Control Methods"}
                </h4>
                <ScrollArea className="h-24 rounded-md border p-4">
                  <p className="text-sm text-muted-foreground">
                    {result.treatment}
                  </p>
                </ScrollArea>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={resetIdentification}>
              <X className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button onClick={() => setShowResult(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IdentificationTool;
