import React, { useState } from "react";
import {
  Plus,
  Filter,
  Calendar,
  Download,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receiptUrl?: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      date: "2023-06-15",
      category: "Seeds",
      amount: 2500,
      description: "Purchased high-yield rice seeds",
    },
    {
      id: "2",
      date: "2023-06-20",
      category: "Fertilizer",
      amount: 3200,
      description: "NPK fertilizer for initial application",
    },
    {
      id: "3",
      date: "2023-07-05",
      category: "Labor",
      amount: 5000,
      description: "Payment for field preparation and planting",
    },
    {
      id: "4",
      date: "2023-07-15",
      category: "Pesticides",
      amount: 1800,
      description: "Insecticide for pest control",
    },
  ]);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "Seeds",
    "Fertilizer",
    "Pesticides",
    "Labor",
    "Equipment",
    "Transportation",
    "Other",
  ];

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const categoryTotals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
    return { category, total };
  });

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expense = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, expense]);
    setIsAddExpenseOpen(false);
  };

  return (
    <div className="bg-background p-4 md:p-6 w-full h-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <Button onClick={() => setIsAddExpenseOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expense Summary</CardTitle>
            <CardDescription>Track your farming expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₱{totalExpenses.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Highest Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {categoryTotals.sort((a, b) => b.total - a.total)[0]
                      ?.category || "None"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ₱
                    {categoryTotals
                      .sort((a, b) => b.total - a.total)[0]
                      ?.total.toLocaleString() || "0"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{expenses.length}</div>
                  <p className="text-xs text-muted-foreground">
                    transactions recorded
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" /> Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <TabsContent value="list" className="space-y-4">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-muted/50 p-3 text-sm font-medium">
                    <div>Date</div>
                    <div>Category</div>
                    <div className="col-span-2">Description</div>
                    <div className="text-right">Amount</div>
                  </div>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="grid grid-cols-5 p-3 text-sm border-t"
                      >
                        <div>{new Date(expense.date).toLocaleDateString()}</div>
                        <div>
                          <Badge variant="outline">{expense.category}</Badge>
                        </div>
                        <div className="col-span-2">{expense.description}</div>
                        <div className="text-right font-medium">
                          ₱{expense.amount.toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No expenses found. Add your first expense to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>
                  Breakdown of expenses by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryTotals
                    .filter((cat) => cat.total > 0)
                    .sort((a, b) => b.total - a.total)
                    .map(({ category, total }) => {
                      const percentage =
                        Math.round((total / totalExpenses) * 100) || 0;
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                {category}
                              </Badge>
                              <span className="text-sm font-medium">
                                ₱{total.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Expense Reports</CardTitle>
                <CardDescription>
                  Generate and export expense reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        View your expenses summarized by month
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Generate Report
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Category Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Analyze spending patterns by category
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" /> Generate Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onAddExpense={handleAddExpense}
        categories={categories}
      />
    </div>
  );
};

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense: (expense: Omit<Expense, "id">) => void;
  categories: string[];
}

const AddExpenseDialog = ({
  open,
  onOpenChange,
  onAddExpense,
  categories,
}: AddExpenseDialogProps) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      date,
      category,
      amount: parseFloat(amount),
      description,
      receiptUrl: receiptFile ? URL.createObjectURL(receiptFile) : undefined,
    });
    resetForm();
  };

  const resetForm = () => {
    setDate(new Date().toISOString().split("T")[0]);
    setCategory(categories[0]);
    setAmount("");
    setDescription("");
    setReceiptFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>
            Record a new farming expense. Add details and optionally attach a
            receipt.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₱)
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="col-span-3"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter expense details"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="receipt" className="text-right">
                Receipt
              </Label>
              <Input
                id="receipt"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setReceiptFile(files[0]);
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseTracker;
