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
import { useDocumentTypeManagement } from "@/hooks/useDocumentTypeManagement"
import { toast } from "@/components/ui/use-toast"

export default function AddDocumentTypePage() {
  const router = useRouter()
  const { createDocType } = useDocumentTypeManagement()
  const [formData, setFormData] = useState({
    nombre: "",
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
      const response = await createDocType({
        nombre: formData.nombre,
        estado: formData.estado
      })
      
      if (response) {
        toast({
          title: "Tipo de documento creado",
          description: "El tipo de documento ha sido creado exitosamente.",
        })
        router.push("/settings/document-type")
      } else {
        toast({
          title: "Error",
          description: "Hubo un error al crear el tipo de documento.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating document type:", error)
      toast({
        title: "Error",
        description: "Hubo un error al crear el tipo de documento.",
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
              { label: "Tipos de Documento", href: "/settings/document-type" },
              { label: "Agregar Tipo de Documento" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Tipo de Documento</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Tipo de Documento</CardTitle>
              <CardDescription>
                Complete los datos del nuevo tipo de documento
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Documento Nacional de Identidad"
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
                  onClick={() => router.push("/settings/document-type")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 