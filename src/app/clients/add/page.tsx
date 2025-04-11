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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clienteService } from "@/services/clientes/clienteService"

// Sample data for dropdowns
const documentTypes = [
  { id: 1, code: "DNI", name: "Documento Nacional de Identidad" },
  { id: 2, code: "CE", name: "Carnet de Extranjería" },
  { id: 3, code: "PAS", name: "Pasaporte" }
]

const districts = [
  { id: 1, code: "MIR", name: "Miraflores" },
  { id: 2, code: "SJL", name: "San Juan de Lurigancho" },
  { id: 3, code: "SMP", name: "San Martín de Porres" },
  { id: 4, code: "BAR", name: "Barranco" },
  { id: 5, code: "SUR", name: "Surco" }
]

const genders = [
  { id: 1, code: "M", name: "Masculino" },
  { id: 2, code: "F", name: "Femenino" },
  { id: 3, code: "O", name: "Otro" }
]

export default function AddClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: true,
    fechaNacimiento: "",
    sexo: { codigo: 0 },
    tipoDocumento: { codigo: 0 },
    distrito: { codigo: 0 }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "sexo") {
      setFormData(prev => ({ ...prev, sexo: { codigo: parseInt(value) } }))
    } else if (name === "tipoDocumento.codigo") {
      setFormData(prev => ({ ...prev, tipoDocumento: { codigo: parseInt(value) } }))
    } else if (name === "distrito.codigo") {
      setFormData(prev => ({ ...prev, distrito: { codigo: parseInt(value) } }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await clienteService.create(formData)
      router.push("/clients")
    } catch (err) {
      console.error("Error creating client:", err)
      setError("Error al crear el cliente. Por favor, intente nuevamente.")
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
              { label: "Clientes", href: "/clients" }, 
              { label: "Agregar Cliente" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Cliente</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
              <CardDescription>
                Complete los datos del nuevo cliente
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipo de Documento</Label>
                    <Select 
                      value={formData.tipoDocumento.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("tipoDocumento.codigo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentNumber">Número de Documento</Label>
                    <Input
                      id="documento"
                      name="documento"
                      value={formData.documento}
                      onChange={handleChange}
                      placeholder="Ej: 12345678"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Juan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="apellidoPaterno"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
                      placeholder="Ej: Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Género</Label>
                    <Select 
                      value={formData.sexo.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("sexo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.id} value={gender.id.toString()}>
                            {gender.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Select 
                      value={formData.distrito.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("distrito.codigo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Ej: Av. Arequipa 123"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 999888777"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ej: juan.perez@example.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/clients")}
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