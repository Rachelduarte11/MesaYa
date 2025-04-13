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
import { Checkbox } from "@/components/ui/checkbox"
import { useDistrictManagement } from "@/hooks/useDistrictManagement"
import { toast } from "@/components/ui/use-toast"

export default function AddDistrictPage() {
  const router = useRouter()
  const { createDistrict, loading } = useDistrictManagement()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, estado: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await createDistrict(formData)
      if (result) {
        toast({
          title: "Distrito creado",
          description: "El distrito ha sido creado exitosamente",
        })
        router.push("/settings/district")
      } else {
        toast({
          title: "Error",
          description: "No se pudo crear el distrito",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating district:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el distrito",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Distritos", href: "/settings/district" },
              { label: "Agregar Distrito" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Distrito</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Distrito</CardTitle>
              <CardDescription>
                Complete los datos del nuevo distrito
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Distrito</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: San Juan de Lurigancho"
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
                      placeholder="Ej: Distrito ubicado en Lima"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="estado" 
                      checked={formData.estado}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="estado">Activo</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/settings/district")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || loading}>
                  {isSubmitting || loading ? "Guardando..." : "Guardar"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 