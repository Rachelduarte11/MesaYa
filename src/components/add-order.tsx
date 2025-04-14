"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Minus, ShoppingCart, Save } from "lucide-react"
import { pedidoService } from "@/services/pedido/pedidoService"
import { useRouter } from "next/navigation"
import { useOrderData } from "@/hooks/useOrderData"
import { CreatePedidoRequest, Plato } from "@/services/api/types"

// Categories for filtering
const categories = ["All", "Entradas", "Platos Principales", "Postres", "Bebidas"]

export function AddOrder() {
  const router = useRouter()
  const { clients, employees, platos, loading, error } = useOrderData()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedClient, setSelectedClient] = useState("")
  const [cart, setCart] = useState<{ codigo: string; name: string; price: number; quantity: number }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredPlatos = platos.filter((plato) => {
    const matchesSearch = plato.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || plato.tipoPlato.nombre === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (plato: Plato) => {
    const existingItem = cart.find((cartItem) => cartItem.codigo === plato.codigo)

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.codigo === plato.codigo ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      )
    } else {
      setCart([...cart, { codigo: plato.codigo, name: plato.nombre, price: plato.precio, quantity: 1 }])
    }
  }

  const removeFromCart = (itemCodigo: string) => {
    setCart(cart.filter((item) => item.codigo !== itemCodigo))
  }

  const updateQuantity = (itemCodigo: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemCodigo)
      return
    }

    setCart(
      cart.map((item) => (item.codigo === itemCodigo ? { ...item, quantity: newQuantity } : item))
    )
  }

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = async () => {
    if (!selectedClient || !selectedEmployee || cart.length === 0) {
      alert("Please select a client, employee and add items to the cart")
      return
    }

    setIsSubmitting(true)
    try {
      const pedidoData: CreatePedidoRequest = {
        nombre: `Pedido ${selectedEmployee}`,
        estado: true,
        estadoPedido: "Pendiente" as const,
        clienteId: Number(selectedClient),
        empleadoId: Number(selectedEmployee),
        detalles: cart.map(item => ({
          cantidad: item.quantity,
          precioUnitario: item.price,
          platoId: Number(item.codigo)
        }))
      }

      await pedidoService.create(pedidoData)
      // Reset the form
      setCart([])
      setSelectedEmployee("")
      setSelectedClient("")
      router.push("/order")
    } catch (err) {
      console.error("Error creating order:", err)
      alert("Error creating order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Select items to add to your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search menu items..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPlatos.map((plato) => (
                  <div
                    key={plato.codigo}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{plato.nombre}</h3>
                      <p className="text-sm text-muted-foreground">${plato.precio.toFixed(2)}</p>
                    </div>
                    <Button size="sm" onClick={() => addToCart(plato)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Complete your order information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.codigo} value={employee.codigo.toString()}>
                        {`${employee.nombre} ${employee.apellidoPaterno}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.codigo} value={client.codigo.toString()}>
                        {`${client.nombre} ${client.apellidoPaterno}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cart Items</Label>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No items in cart</p>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.codigo} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.codigo, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.codigo, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">${getTotalAmount().toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Order"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

