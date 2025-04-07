"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface Order {
  id: string
  clientName: string
  total: number
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  itemCount: number
  formattedDate?: string
}

export function ViewOrder() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [formattedOrders, setFormattedOrders] = useState<Order[]>([])
  const [isClient, setIsClient] = useState(false)

  // Mock data - in a real app, this would come from an API
  const mockOrders: Order[] = [
    {
      id: 'order-1',
      clientName: 'John Doe',
      total: 45.97,
      status: 'completed',
      createdAt: '2024-03-15T10:30:00Z',
      itemCount: 3,
    },
    {
      id: 'order-2',
      clientName: 'Jane Smith',
      total: 32.50,
      status: 'pending',
      createdAt: '2024-03-15T11:45:00Z',
      itemCount: 2,
    },
    {
      id: 'order-3',
      clientName: 'Bob Johnson',
      total: 28.99,
      status: 'cancelled',
      createdAt: '2024-03-15T12:15:00Z',
      itemCount: 1,
    },
    {
      id: 'order-4',
      clientName: 'Alice Brown',
      total: 65.75,
      status: 'completed',
      createdAt: '2024-03-15T13:20:00Z',
      itemCount: 4,
    },
    {
      id: 'order-5',
      clientName: 'Charlie Davis',
      total: 42.25,
      status: 'pending',
      createdAt: '2024-03-15T14:10:00Z',
      itemCount: 3,
    },
  ]

  // Format dates on the client side only
  useEffect(() => {
    const formatted = mockOrders.map(order => ({
      ...order,
      formattedDate: new Date(order.createdAt).toLocaleDateString()
    }))
    setFormattedOrders(formatted)
    setIsClient(true)
  }, [])

  const filteredOrders = formattedOrders.filter(
    (order) =>
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Order['status']) => {
    const statusColors = {
      pending: 'bg-yellow-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500',
    }
    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>View and manage your restaurant orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isClient ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.formattedDate}</TableCell>
                  <TableCell>{order.itemCount}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/order/details?id=${order.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">Loading orders...</div>
        )}
      </CardContent>
    </Card>
  )
}

