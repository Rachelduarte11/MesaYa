"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Image, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample menu items data
const initialPlates = [
  {
    id: 1,
    name: "Original Chess Meat Burger With Chips",
    category: "Burgers",
    price: 23.99,
    cost: 8.5,
    type: "Non Veg",
    description:
      "Juicy beef patty with melted cheese, lettuce, tomato, and special sauce. Served with crispy french fries.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg",
  },
  {
    id: 2,
    name: "Fresh Orange Juice With Basil Seed",
    category: "Beverages",
    price: 12.99,
    cost: 3.25,
    type: "Veg",
    description: "Freshly squeezed orange juice with basil seeds for added texture and nutrition.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg",
  },
  {
    id: 3,
    name: "Meat Sushi Maki With Tuna",
    category: "Sushi",
    price: 9.99,
    cost: 4.75,
    type: "Non Veg",
    description: "Fresh tuna sushi rolls with cucumber, avocado, and spicy mayo.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg",
  },
  {
    id: 4,
    name: "Tacos Salsa With Chickens Grilled",
    category: "Mexican",
    price: 14.99,
    cost: 5.5,
    type: "Non Veg",
    description: "Grilled chicken tacos with fresh salsa, guacamole, and sour cream.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg",
  },
  {
    id: 5,
    name: "Tasty Vegetable Salad Healthy Diet",
    category: "Salads",
    price: 17.99,
    cost: 6.25,
    type: "Veg",
    description: "Fresh mixed greens with seasonal vegetables, nuts, and balsamic vinaigrette.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-12%20at%2012.32.42%20PM-QicgA83ZI0TfZlOynDOqlhOGnbwzEv.jpeg",
  },
]

const categories = ["All", "Burgers", "Beverages", "Sushi", "Mexican", "Salads", "Pasta", "Main Course", "Desserts"]

export function PlatesManagement() {
  const [plates, setPlates] = useState(initialPlates)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [newPlate, setNewPlate] = useState({
    name: "",
    category: "",
    price: 0,
    cost: 0,
    type: "Veg",
    description: "",
    image: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredPlates = plates.filter((plate) => {
    const matchesSearch =
      plate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "All" || plate.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleAddPlate = () => {
    const id = plates.length > 0 ? Math.max(...plates.map((p) => p.id)) + 1 : 1

    setPlates([
      ...plates,
      {
        ...newPlate,
        id,
      },
    ])

    setNewPlate({
      name: "",
      category: "",
      price: 0,
      cost: 0,
      type: "Veg",
      description: "",
      image: "",
    })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center w-2/3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search menu items..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select defaultValue="All" onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Add New Plate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Enter the details for the new menu item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newPlate.name}
                    onChange={(e) => setNewPlate({ ...newPlate, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setNewPlate({ ...newPlate, category: value })}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c !== "All")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newPlate.price || ""}
                    onChange={(e) => setNewPlate({ ...newPlate, price: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={newPlate.cost || ""}
                    onChange={(e) => setNewPlate({ ...newPlate, cost: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue="Veg" onValueChange={(value) => setNewPlate({ ...newPlate, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Veg">Vegetarian</SelectItem>
                    <SelectItem value="Non Veg">Non-Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPlate.description}
                  onChange={(e) => setNewPlate({ ...newPlate, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newPlate.image}
                  onChange={(e) => setNewPlate({ ...newPlate, image: e.target.value })}
                  placeholder="Enter image URL or upload"
                />
                <div className="mt-2 flex items-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Image className="mr-1 h-3 w-3" /> Upload Image
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddPlate}>
                Add Menu Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>Manage your restaurant's menu items and dishes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlates.map((plate) => (
                <TableRow key={plate.id}>
                  <TableCell>
                    <img
                      src={plate.image || "/placeholder.svg"}
                      alt={plate.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{plate.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-gray-100">
                      {plate.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${plate.type === "Veg" ? "bg-green-500" : "bg-red-500"}`}
                      ></span>
                      {plate.type}
                    </div>
                  </TableCell>
                  <TableCell>${plate.price.toFixed(2)}</TableCell>
                  <TableCell>${plate.cost.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">${(plate.price - plate.cost).toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Tag className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredPlates.length} of {plates.length} menu items
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

