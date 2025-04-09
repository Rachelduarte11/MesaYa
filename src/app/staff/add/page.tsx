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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { empleadoService } from "@/services/empleados/empleadoService"
import { CreateEmpleadoRequest } from "@/services/api/types"

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
  { id: 2, code: "F", name: "Femenino" }
]

const roles = [
  { id: 1, code: "ADMIN", name: "Administrador" },
  { id: 2, code: "MANAGER", name: "Gerente" },
  { id: 3, code: "WAITER", name: "Mesero" },
  { id: 4, code: "KITCHEN", name: "Cocina" },
  { id: 5, code: "CASHIER", name: "Cajero" }
]

export default function AddStaffPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CreateEmpleadoRequest>({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    documento: "",
    direccion: "",
    telefono: "",
    email: "",
    estado: true
  })

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const [modalData, setModalData] = useState({
    code: "",
    name: "",
    description: "",
    province: "",
    department: ""
  })
  const [isModalSubmitting, setIsModalSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (name: keyof CreateEmpleadoRequest, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await empleadoService.create(formData)
      router.push("/staff")
    } catch (err) {
      setError("Error al crear el empleado. Por favor, intente nuevamente.")
      console.error("Error creating employee:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = (type: string) => {
    setModalType(type)
    setModalData({
      code: "",
      name: "",
      description: "",
      province: "",
      department: ""
    })
    
    switch (type) {
      case "documentType":
        setModalTitle("Agregar Nuevo Tipo de Documento")
        break
      case "district":
        setModalTitle("Agregar Nuevo Distrito")
        break
      case "gender":
        setModalTitle("Agregar Nuevo Género")
        break
      case "role":
        setModalTitle("Agregar Nuevo Cargo")
        break
      default:
        setModalTitle("Agregar Nuevo Elemento")
    }
    
    setModalOpen(true)
  }

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setModalData((prev) => ({ ...prev, [name]: value }))
  }

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log(`New ${modalType} data submitted:`, modalData)
      setIsModalSubmitting(false)
      setModalOpen(false)
      
      // Here you would typically update the local state with the new item
      // For now, we'll just show a success message
      alert(`${modalTitle} agregado exitosamente`)
    }, 1000)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Personal", href: "/staff" }, 
              { label: "Agregar Personal" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Personal</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Empleado</CardTitle>
              <CardDescription>
                Complete el formulario para agregar un nuevo empleado
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

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
                    <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
                    <Input
                      id="apellidoPaterno"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={handleChange}
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
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documento">Documento</Label>
                    <Input
                      id="documento"
                      name="documento"
                      value={formData.documento}
                      onChange={handleChange}
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
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={formData.estado ? "activo" : "inactivo"}
                      onValueChange={(value) => handleSelectChange("estado", value === "activo")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="activo">Activo</SelectItem>
                        <SelectItem value="inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/staff")}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      {/* Modal for adding new items */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Complete los datos para agregar un nuevo elemento al catálogo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleModalSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal-code">Código</Label>
                  <Input
                    id="modal-code"
                    name="code"
                    value={modalData.code}
                    onChange={handleModalChange}
                    placeholder="Código"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal-name">Nombre</Label>
                  <Input
                    id="modal-name"
                    name="name"
                    value={modalData.name}
                    onChange={handleModalChange}
                    placeholder="Nombre"
                    required
                  />
                </div>
              </div>
              
              {modalType === "district" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="modal-province">Provincia</Label>
                    <Input
                      id="modal-province"
                      name="province"
                      value={modalData.province}
                      onChange={handleModalChange}
                      placeholder="Provincia"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modal-department">Departamento</Label>
                    <Input
                      id="modal-department"
                      name="department"
                      value={modalData.department}
                      onChange={handleModalChange}
                      placeholder="Departamento"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="modal-description">Descripción</Label>
                <Textarea
                  id="modal-description"
                  name="description"
                  value={modalData.description}
                  onChange={handleModalChange}
                  placeholder="Descripción detallada"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isModalSubmitting}>
                {isModalSubmitting ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 