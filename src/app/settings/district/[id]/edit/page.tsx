"use client"

import { useState, useEffect } from "react"
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
import { Distrito } from "@/services/api/types"
import { distritoService } from "@/services/distritos/distritoService"

export default function EditDistrictPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { updateDistrict, loading } = useDistrictManagement()
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const district = await distritoService.getByCodigo(params.id)
        if (district) {
          setFormData({
            nombre: district.nombre,
            descripcion: district.descripcion || "",
            estado: district.estado,
          })
        } else {
          toast({
            title: "Error",
            description: "No se pudo cargar el distrito",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching district:", error)
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar el distrito",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchDistrict()
  }, [params.id])

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
      const result = await updateDistrict(params.id, formData)
      if (result) {
        toast({
          title: "Distrito actualizado",
          description: "El distrito ha sido actualizado exitosamente",
        })
        router.push("/settings/district")
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el distrito",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating district:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el distrito",
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
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-full">
              <p>Cargando...</p>
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
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Distritos", href: "/settings/district" },
              { label: "Editar Distrito" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Distrito</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Distrito</CardTitle>
              <CardDescription>
                Actualice los datos del distrito
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