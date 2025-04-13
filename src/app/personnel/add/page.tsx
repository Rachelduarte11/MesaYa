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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { empleadoService } from "@/services/empleados/empleadoService"
import { tipoDocumentoService } from "@/services/tipoDocumento/tipoDocumentoService"
import { distritoService } from "@/services/distritos/distritoService"
import { sexoService } from "@/services/sexos/sexoService"
import { rolService } from "@/services/roles/rolService"
import { Empleado, TipoDocumento, Distrito, Sexo, Rol } from "@/services/api/types"

export default function AddPersonnelPage() {
  const router = useRouter()
  const [documentTypes, setDocumentTypes] = useState<TipoDocumento[]>([])
  const [districts, setDistricts] = useState<Distrito[]>([])
  const [genders, setGenders] = useState<Sexo[]>([])
  const [roles, setRoles] = useState<Rol[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Partial<Empleado>>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: true,
    fechaNacimiento: "",
    sueldo: 0,
    tipoDocumento: { codigo: 0, nombre: "", estado: true },
    rol: { codigo: 0, nombre: "", estado: true },
    distrito: { codigo: 0, nombre: "", estado: true }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docTypes, dists, sexos, rolesList] = await Promise.all([
          tipoDocumentoService.getAllActive(),
          distritoService.getAllActive(),
          sexoService.getAllActive(),
          rolService.getAllActive()
        ])
        setDocumentTypes(docTypes)
        setDistricts(dists)
        setGenders(sexos)
        setRoles(rolesList)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Error al cargar los datos. Por favor, intente nuevamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "tipoDocumento") {
      const selectedDocType = documentTypes.find(dt => dt.codigo.toString() === value)
      if (selectedDocType) {
        setFormData(prev => ({ ...prev, tipoDocumento: selectedDocType }))
      }
    } else if (name === "rol") {
      const selectedRole = roles.find(r => r.codigo.toString() === value)
      if (selectedRole) {
        setFormData(prev => ({ ...prev, rol: selectedRole }))
      }
    } else if (name === "distrito") {
      const selectedDistrict = districts.find(d => d.codigo.toString() === value)
      if (selectedDistrict) {
        setFormData(prev => ({ ...prev, distrito: selectedDistrict }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await empleadoService.create(formData as any)
      router.push("/personnel")
    } catch (err) {
      console.error("Error creating employee:", err)
      setError("Error al crear el empleado. Por favor, intente nuevamente.")
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500">{error}</div>
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
                    <Label htmlFor="nombre">Nombre</Label>
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
                    <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
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
                    <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
                    <Input
                      id="apellidoMaterno"
                      name="apellidoMaterno"
                      value={formData.apellidoMaterno}
                      onChange={handleChange}
                      placeholder="Ej: García"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                    <Select 
                      value={formData.tipoDocumento?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("tipoDocumento", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {documentTypes.map((type) => (
                          <SelectItem key={type.codigo} value={type.codigo.toString()}>
                            {type.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documento">Número de Documento</Label>
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
                    <Label htmlFor="rol">Rol</Label>
                    <Select 
                      value={formData.rol?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("rol", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.codigo} value={role.codigo.toString()}>
                            {role.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distrito">Distrito</Label>
                    <Select 
                      value={formData.distrito?.codigo.toString()} 
                      onValueChange={(value) => handleSelectChange("distrito", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.codigo} value={district.codigo.toString()}>
                            {district.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
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
                    <Label htmlFor="telefono">Teléfono</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <Input
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      type="date"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      required
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sueldo">Sueldo</Label>
                    <Input
                      id="sueldo"
                      name="sueldo"
                      type="number"
                      value={formData.sueldo}
                      onChange={handleChange}
                      placeholder="Ej: 2500"
                      required
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/personnel")}
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