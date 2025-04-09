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
  estado: number
  nombre: string
  fecha: string
  estado_pedido: string
  total: number
  cliente_id: number
  empleado_id: number
  clientName: string
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
      estado: 1,
      nombre: 'Pedido 001',
      fecha: '2024-03-15T10:30:00Z',
      estado_pedido: 'Entregado',
      total: 45.97,
      cliente_id: 1,
      empleado_id: 1,
      clientName: 'John Doe',
      itemCount: 3,
    },
    {
      id: 'order-2',
      estado: 1,
      nombre: 'Pedido 002',
      fecha: '2024-03-15T11:45:00Z',
      estado_pedido: 'Pendiente',
      total: 32.50,
      cliente_id: 2,
      empleado_id: 2,
      clientName: 'Jane Smith',
      itemCount: 2,
    },
    {
      id: 'order-3',
      estado: 0,
      nombre: 'Pedido 003',
      fecha: '2024-03-15T12:15:00Z',
      estado_pedido: 'Cancelado',
      total: 28.99,
      cliente_id: 3,
      empleado_id: 3,
      clientName: 'Bob Johnson',
      itemCount: 1,
    },
    {
      id: 'order-4',
      estado: 1,
      nombre: 'Pedido 004',
      fecha: '2024-03-15T13:20:00Z',
      estado_pedido: 'Entregado',
      total: 65.75,
      cliente_id: 4,
      empleado_id: 1,
      clientName: 'Alice Brown',
      itemCount: 4,
    },
    {
      id: 'order-5',
      estado: 1,
      nombre: 'Pedido 005',
      fecha: '2024-03-15T14:10:00Z',
      estado_pedido: 'Pendiente',
      total: 42.25,
      cliente_id: 5,
      empleado_id: 2,
      clientName: 'Charlie Davis',
      itemCount: 3,
    },
  ]

  // Format dates on the client side only
  useEffect(() => {
    const formatted = mockOrders.map(order => ({
      ...order,
      formattedDate: new Date(order.fecha).toLocaleDateString()
    }))
    setFormattedOrders(formatted)
    setIsClient(true)
  }, [])

  const filteredOrders = formattedOrders.filter(
    (order) =>
      order.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Pendiente': 'bg-yellow-500',
      'Entregado': 'bg-green-500',
      'Cancelado': 'bg-red-500',
    }
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}>
        {status}
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
                <TableHead>ID</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado Pedido</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Cliente ID</TableHead>
                <TableHead>Empleado ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.estado === 1 ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell>{order.nombre}</TableCell>
                  <TableCell>{order.formattedDate}</TableCell>
                  <TableCell>{getStatusBadge(order.estado_pedido)}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.cliente_id}</TableCell>
                  <TableCell>{order.empleado_id}</TableCell>
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

