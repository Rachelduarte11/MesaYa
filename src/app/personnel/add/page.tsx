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
import { PlusCircle } from "lucide-react"

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

const roles = [
  { id: 1, code: "ADMIN", name: "Administrador" },
  { id: 2, code: "MANAGER", name: "Gerente" },
  { id: 3, code: "WAITER", name: "Mesero" },
  { id: 4, code: "KITCHEN", name: "Cocina" },
  { id: 5, code: "CASHIER", name: "Cajero" }
]

export default function AddPersonnelPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
    name: "",
    lastName: "",
    gender: "",
    district: "",
    address: "",
    phone: "",
    email: "",
    role: "",
    salary: "",
    startDate: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("Personnel data submitted:", formData)
      setIsSubmitting(false)
      router.push("/personnel")
    }, 1000)
  }

  const handleAddNew = (type: string) => {
    switch (type) {
      case "documentType":
        router.push("/settings/document-type/add")
        break
      case "district":
        router.push("/settings/district/add")
        break
      case "gender":
        router.push("/settings/gender/add")
        break
      case "role":
        router.push("/settings/role/add")
        break
      default:
        break
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
              { label: "Personal", href: "/personnel" }, 
              { label: "Agregar Personal" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Personal</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Personal</CardTitle>
              <CardDescription>
                Complete los datos del nuevo miembro del personal
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej: Juan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Ej: Pérez"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipo de Documento</Label>
                    <Select 
                      value={formData.documentType} 
                      onValueChange={(value) => handleSelectChange("documentType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.id} value={type.code}>
                            {type.name}
                          </SelectItem>
                        ))}
                        <SelectItem 
                          value="add-new" 
                          className="flex items-center justify-between cursor-pointer"
                          onSelect={() => handleAddNew("documentType")}
                        >
                          <span>Agregar nuevo tipo de documento</span>
                          <PlusCircle className="h-4 w-4 ml-2" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentNumber">Número de Documento</Label>
                    <Input
                      id="documentNumber"
                      name="documentNumber"
                      value={formData.documentNumber}
                      onChange={handleChange}
                      placeholder="Ej: 12345678"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Género</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione género" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.id} value={gender.code}>
                            {gender.name}
                          </SelectItem>
                        ))}
                        <SelectItem 
                          value="add-new" 
                          className="flex items-center justify-between cursor-pointer"
                          onSelect={() => handleAddNew("gender")}
                        >
                          <span>Agregar nuevo género</span>
                          <PlusCircle className="h-4 w-4 ml-2" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">Distrito</Label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(value) => handleSelectChange("district", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.code}>
                            {district.name}
                          </SelectItem>
                        ))}
                        <SelectItem 
                          value="add-new" 
                          className="flex items-center justify-between cursor-pointer"
                          onSelect={() => handleAddNew("district")}
                        >
                          <span>Agregar nuevo distrito</span>
                          <PlusCircle className="h-4 w-4 ml-2" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ej: Av. Arequipa 123"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
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
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleSelectChange("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.code}>
                            {role.name}
                          </SelectItem>
                        ))}
                        <SelectItem 
                          value="add-new" 
                          className="flex items-center justify-between cursor-pointer"
                          onSelect={() => handleAddNew("role")}
                        >
                          <span>Agregar nuevo rol</span>
                          <PlusCircle className="h-4 w-4 ml-2" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salario</Label>
                    <Input
                      id="salary"
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Ej: 2500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de Inicio</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/personnel")}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
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