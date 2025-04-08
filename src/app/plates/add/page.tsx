"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image as ImageIcon } from "lucide-react"

export default function AddPlatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    cost: "",
    type: "",
    description: "",
    image: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("Plate data submitted:", formData)
      setIsSubmitting(false)
      router.push("/plates")
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Platos", href: "/plates" }, 
              { label: "Agregar Plato" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Plato</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Plato</CardTitle>
              <CardDescription>
                Complete los datos del nuevo plato
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Nombre del plato"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appetizers">Entradas</SelectItem>
                        <SelectItem value="mainCourses">Platos Principales</SelectItem>
                        <SelectItem value="desserts">Postres</SelectItem>
                        <SelectItem value="beverages">Bebidas</SelectItem>
                        <SelectItem value="specialties">Especialidades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio de Venta</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Costo</Label>
                    <Input
                      id="cost"
                      name="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="veg">Vegetariano</SelectItem>
                        <SelectItem value="nonVeg">No Vegetariano</SelectItem>
                        <SelectItem value="vegan">Vegano</SelectItem>
                        <SelectItem value="glutenFree">Sin Gluten</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">URL de la Imagen</Label>
                    <div className="flex">
                      <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="URL de la imagen"
                      />
                      <Button type="button" variant="outline" className="ml-2">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción detallada del plato"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/plates")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Plato"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 