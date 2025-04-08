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

// Sample plate type data
const samplePlateTypes = [
  {
    id: 1,
    nombre: "Entradas",
    descripcion: "Platos para comenzar la comida",
    estado: true
  },
  {
    id: 2,
    nombre: "Platos Principales",
    descripcion: "Platos principales del menú",
    estado: true
  },
  {
    id: 3,
    nombre: "Postres",
    descripcion: "Dulces y postres",
    estado: true
  },
  {
    id: 4,
    nombre: "Bebidas",
    descripcion: "Bebidas y refrescos",
    estado: true
  }
]

export default function EditPlateTypePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const typeId = parseInt(resolvedParams.id)
  
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: true
  })

  useEffect(() => {
    // In a real app, this would be an API call
    const plateType = samplePlateTypes.find(t => t.id === typeId)
    
    if (plateType) {
      setFormData(plateType)
    } else {
      // If plate type not found, redirect to plate types page
      router.push("/plates/types")
    }
  }, [typeId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would be an API call to update the plate type
    console.log("Updating plate type:", formData)
    
    // Redirect back to plate types page
    router.push("/plates/types")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
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
              { label: "Tipos de Plato", href: "/plates/types" },
              { label: "Editar Tipo de Plato" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Tipo de Plato</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Tipo de Plato</CardTitle>
              <CardDescription>
                Actualice la información del tipo de plato
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
                  onClick={() => router.push("/plates/types")}
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