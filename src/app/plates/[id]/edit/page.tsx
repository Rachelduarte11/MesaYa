"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample plate data
const samplePlates = [
  {
    id: 1,
    nombre: "Ceviche",
    descripcion: "Pescado fresco en limón",
    precio: 25.90,
    costo: 15.00,
    tipoPlato: 1,
    imagen: "https://example.com/ceviche.jpg",
    estado: true
  },
  {
    id: 2,
    nombre: "Lomo Saltado",
    descripcion: "Plato típico peruano",
    precio: 45.90,
    costo: 25.00,
    tipoPlato: 2,
    imagen: "https://example.com/lomo-saltado.jpg",
    estado: true
  },
  {
    id: 3,
    nombre: "Suspiro a la Limeña",
    descripcion: "Postre tradicional",
    precio: 15.90,
    costo: 8.00,
    tipoPlato: 3,
    imagen: "https://example.com/suspiro.jpg",
    estado: true
  }
]

// Sample plate types
const plateTypes = [
  { id: 1, nombre: "Entradas" },
  { id: 2, nombre: "Platos Principales" },
  { id: 3, nombre: "Postres" },
  { id: 4, nombre: "Bebidas" }
]

export default function EditPlatePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const plateId = parseInt(resolvedParams.id)
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    costo: 0,
    tipoPlato: 1,
    imagen: "",
    estado: true
  })

  useEffect(() => {
    // In a real app, this would be an API call
    const plate = samplePlates.find(p => p.id === plateId)
    
    if (plate) {
      setFormData(plate)
    } else {
      // If plate not found, redirect to plates page
      router.push("/plates")
    }
  }, [plateId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would be an API call to update the plate
    console.log("Updating plate:", formData)
    
    // Redirect back to plates page
    router.push("/plates")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : 
               type === "number" ? parseFloat(value) : value
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      tipoPlato: parseInt(value)
    })
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
              { label: "Editar Plato" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Plato</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Plato</CardTitle>
              <CardDescription>
                Actualice la información del plato
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Input
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      step="0.01"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costo">Costo</Label>
                    <Input
                      id="costo"
                      name="costo"
                      type="number"
                      step="0.01"
                      value={formData.costo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoPlato">Tipo de Plato</Label>
                    <Select 
                      value={formData.tipoPlato.toString()} 
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {plateTypes.map(type => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imagen">URL de la Imagen</Label>
                    <Input
                      id="imagen"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="estado"
                        name="estado"
                        checked={formData.estado}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="estado" className="text-sm">Activo</Label>
                    </div>
                  </div>
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
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Guardar Cambios
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 