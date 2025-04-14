"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useDocumentTypeManagement } from "@/hooks/useDocumentTypeManagement"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function EditDocumentTypePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { updateDocType, getByCodigo } = useDocumentTypeManagement()
  const [formData, setFormData] = useState({
    nombre: "",
    estado: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDocumentType = async () => {
      try {
        const documentType = await getByCodigo(params.id)
        setFormData({
          nombre: documentType.nombre,
          estado: documentType.estado,
        })
      } catch (error) {
        console.error("Error fetching document type:", error)
        toast({
          title: "Error",
          description: "Hubo un error al cargar el tipo de documento.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocumentType()
  }, [params.id, getByCodigo])

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
      const response = await updateDocType(params.id, {
        nombre: formData.nombre,
        estado: formData.estado
      })
      
      if (response) {
        toast({
          title: "Tipo de documento actualizado",
          description: "El tipo de documento ha sido actualizado exitosamente.",
        })
        router.push("/settings/document-type")
      } else {
        toast({
          title: "Error",
          description: "Hubo un error al actualizar el tipo de documento.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating document type:", error)
      toast({
        title: "Error",
        description: "Hubo un error al actualizar el tipo de documento.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Tipos de Documento", href: "/settings/document-type" },
              { label: "Editar Tipo de Documento" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Tipo de Documento</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Tipo de Documento</CardTitle>
              <CardDescription>
                Actualice los datos del tipo de documento
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