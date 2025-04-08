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

// Sample district data
const sampleDistricts = [
  {
    id: 1,
    code: "SJL",
    name: "San Juan de Lurigancho",
    province: "Lima",
    department: "Lima",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    code: "MIR",
    name: "Miraflores",
    province: "Lima",
    department: "Lima",
    createdAt: "2024-03-15",
  },
  {
    id: 3,
    code: "SMP",
    name: "San Martín de Porres",
    province: "Lima",
    department: "Lima",
    createdAt: "2024-03-15",
  },
  {
    id: 4,
    code: "BAR",
    name: "Barranco",
    province: "Lima",
    department: "Lima",
    createdAt: "2024-03-15",
  }
]

export default function EditDistrictPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    province: "",
    department: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get district data
    const district = sampleDistricts.find(d => d.id === parseInt(params.id))
    if (district) {
      setFormData({
        code: district.code,
        name: district.name,
        province: district.province,
        department: district.department,
      })
    }
    setIsLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("District data updated:", formData)
      setIsSubmitting(false)
      router.push("/catalog/district")
    }, 1000)
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
              { label: "Catálogo", href: "/catalog" }, 
              { label: "Distritos", href: "/catalog/district" },
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
                    <Label htmlFor="code">Código</Label>
                    <Input
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Ej: SJL"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Distrito</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej: San Juan de Lurigancho"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Provincia</Label>
                    <Input
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      placeholder="Ej: Lima"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Ej: Lima"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/catalog/district")}
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