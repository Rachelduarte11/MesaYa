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
import { useRoleManagement } from "@/hooks/useRoleManagement"
import { toast } from "@/components/ui/use-toast"

export default function EditRolePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getByCodigo, updateRole } = useRoleManagement()
  const [formData, setFormData] = useState({
    nombre: "",
    estado: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getByCodigo(params.id)
        if (role) {
          setFormData({
            nombre: role.nombre,
            estado: role.estado,
          })
        }
      } catch (error) {
        console.error("Error fetching role:", error)
        toast({
          title: "Error",
          description: "Hubo un error al cargar el rol.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRole()
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
      const response = await updateRole(params.id, {
        nombre: formData.nombre,
        estado: formData.estado
      })
      
      if (response) {
        toast({
          title: "Rol actualizado",
          description: "El rol ha sido actualizado exitosamente.",
        })
        router.push("/settings/role")
      } else {
        toast({
          title: "Error",
          description: "Hubo un error al actualizar el rol.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating role:", error)
      toast({
        title: "Error",
        description: "Hubo un error al actualizar el rol.",
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
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Roles / Posiciones", href: "/settings/role" },
              { label: "Editar Rol / Posición" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Rol / Posición</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Rol / Posición</CardTitle>
              <CardDescription>
                Modifique los datos del rol o posición
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
                      placeholder="Ej: Administrador"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="estado"
                      checked={formData.estado}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="estado">Por Defecto</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/settings/role")}
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