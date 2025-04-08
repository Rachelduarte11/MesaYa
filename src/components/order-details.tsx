"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Search, Eye, FileText, Printer, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample order data
const initialOrders = [
  {
    id: "ORD-001",
    table: "4",
    customer: "Floyd Miles",
    items: 4,
    total: 61.96,
    status: "Completed",
    time: "12:30 PM",
    date: "2025-04-07",
  },
  {
    id: "ORD-002",
    table: "7",
    customer: "Jane Cooper",
    items: 3,
    total: 42.5,
    status: "In Progress",
    time: "1:15 PM",
    date: "2025-04-07",
  },
  {
    id: "ORD-003",
    table: "2",
    customer: "Esther Howard",
    items: 5,
    total: 78.25,
    status: "Pending",
    time: "1:45 PM",
    date: "2025-04-07",
  },
  {
    id: "ORD-004",
    table: "9",
    customer: "Robert Fox",
    items: 2,
    total: 29.99,
    status: "Completed",
    time: "11:20 AM",
    date: "2025-04-07",
  },
  {
    id: "ORD-005",
    table: "5",
    customer: "Jenny Wilson",
    items: 6,
    total: 87.75,
    status: "In Progress",
    time: "2:00 PM",
    date: "2025-04-07",
  },
]

// Sample order items for a specific order
const orderItems = [
  { name: "Original Chess Meat Burger With Chips", quantity: 1, price: 23.99, total: 23.99 },
  { name: "Fresh Orange Juice With Basil Seed", quantity: 1, price: 12.99, total: 12.99 },
  { name: "Meat Sushi Maki With Tuna", quantity: 1, price: 9.99, total: 9.99 },
  { name: "Tacos Salsa With Chickens Grilled", quantity: 1, price: 14.99, total: 14.99 },
]

export function OrderDetails() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedOrder, setSelectedOrder] = useState<null | (typeof initialOrders)[0]>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.table.includes(searchTerm)

    const matchesStatus = statusFilter === "All" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center w-2/3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders by ID, customer, or table..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select defaultValue="All" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-green-600 hover:bg-green-700">
          <Clock className="mr-2 h-4 w-4" /> Today's Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage all restaurant orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>Table {order.table}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.date} at {order.time}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog
                        open={isViewDialogOpen && selectedOrder?.id === order.id}
                        onOpenChange={(open) => {
                          setIsViewDialogOpen(open)
                          if (open) setSelectedOrder(order)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Order Details - {order.id}</DialogTitle>
                            <DialogDescription>Complete details for this order</DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <h3 className="font-medium mb-2">Order Information</h3>
                                <div className="text-sm space-y-1">
                                  <p>
                                    <span className="font-medium">Order ID:</span> {order.id}
                                  </p>
                                  <p>
                                    <span className="font-medium">Date:</span> {order.date}
                                  </p>
                                  <p>
                                    <span className="font-medium">Time:</span> {order.time}
                                  </p>
                                  <p>
                                    <span className="font-medium">Status:</span>
                                    <Badge className={`ml-2 ${getStatusBadgeColor(order.status)}`}>
                                      {order.status}
                                    </Badge>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">Customer Information</h3>
                                <div className="text-sm space-y-1">
                                  <p>
                                    <span className="font-medium">Name:</span> {order.customer}
                                  </p>
                                  <p>
                                    <span className="font-medium">Table:</span> {order.table}
                                  </p>
                                  <p>
                                    <span className="font-medium">Items:</span> {order.items}
                                  </p>
                                  <p>
                                    <span className="font-medium">Total:</span> ${order.total.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <h3 className="font-medium mb-2">Order Items</h3>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead>Quantity</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {orderItems.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${item.total.toFixed(2)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            <div className="mt-4 space-y-2 border-t pt-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>${(order.total * 0.95).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tax (5%)</span>
                                <span>${(order.total * 0.05).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                              Close
                            </Button>
                            <Button variant="outline">
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Bill
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700">
                              <Printer className="mr-2 h-4 w-4" />
                              Print Receipt
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
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
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

