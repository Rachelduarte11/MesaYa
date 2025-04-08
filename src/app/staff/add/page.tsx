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
import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  const [formData, setFormData] = useState({
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    tipodocumento: "",
    numerodocumento: "",
    genero: "",
    distrito: "",
    fechanacimiento: "",
    direccion: "",
    telefono: "",
    celular: "",
    correo: "",
    estado: true,
    cargo: "",
    fechacontratacion: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("Staff data submitted:", formData)
      setIsSubmitting(false)
      router.push("/staff")
    }, 1000)
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
              <CardTitle>Información del Personal</CardTitle>
              <CardDescription>
                Complete los datos del nuevo miembro del personal
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Nombre"
                      maxLength={40}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidopaterno">Apellido Paterno</Label>
                    <Input
                      id="apellidopaterno"
                      name="apellidopaterno"
                      value={formData.apellidopaterno}
                      onChange={handleChange}
                      placeholder="Apellido Paterno"
                      maxLength={40}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidomaterno">Apellido Materno</Label>
                    <Input
                      id="apellidomaterno"
                      name="apellidomaterno"
                      value={formData.apellidomaterno}
                      onChange={handleChange}
                      placeholder="Apellido Materno"
                      maxLength={40}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipodocumento">Tipo de Documento</Label>
                    <Select 
                      value={formData.tipodocumento} 
                      onValueChange={(value) => handleSelectChange("tipodocumento", value)}
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
                          className="flex items-center text-green-600 cursor-pointer"
                          onSelect={() => handleAddNew("documentType")}
                        >
                          <div className="flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            <span>Agregar nuevo tipo de documento</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numerodocumento">Número de Documento</Label>
                    <Input
                      id="numerodocumento"
                      name="numerodocumento"
                      value={formData.numerodocumento}
                      onChange={handleChange}
                      placeholder="Número de Documento"
                      maxLength={20}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechanacimiento">Fecha de Nacimiento</Label>
                    <Input
                      id="fechanacimiento"
                      name="fechanacimiento"
                      type="date"
                      value={formData.fechanacimiento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genero">Género</Label>
                    <Select 
                      value={formData.genero} 
                      onValueChange={(value) => handleSelectChange("genero", value)}
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
                          className="flex items-center text-green-600 cursor-pointer"
                          onSelect={() => handleAddNew("gender")}
                        >
                          <div className="flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            <span>Agregar nuevo género</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="distrito">Distrito</Label>
                    <Select 
                      value={formData.distrito} 
                      onValueChange={(value) => handleSelectChange("distrito", value)}
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
                          className="flex items-center text-green-600 cursor-pointer"
                          onSelect={() => handleAddNew("district")}
                        >
                          <div className="flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            <span>Agregar nuevo distrito</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Textarea
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Dirección completa"
                      maxLength={300}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono Fijo</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Teléfono fijo"
                      maxLength={7}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="celular">Celular</Label>
                    <Input
                      id="celular"
                      name="celular"
                      value={formData.celular}
                      onChange={handleChange}
                      placeholder="Número de celular"
                      maxLength={9}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Electrónico</Label>
                    <Input
                      id="correo"
                      name="correo"
                      type="email"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Select 
                      value={formData.cargo} 
                      onValueChange={(value) => handleSelectChange("cargo", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.code}>
                            {role.name}
                          </SelectItem>
                        ))}
                        <SelectItem 
                          value="add-new" 
                          className="flex items-center text-green-600 cursor-pointer"
                          onSelect={() => handleAddNew("role")}
                        >
                          <div className="flex items-center">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            <span>Agregar nuevo cargo</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechacontratacion">Fecha de Contratación</Label>
                    <Input
                      id="fechacontratacion"
                      name="fechacontratacion"
                      type="date"
                      value={formData.fechacontratacion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="estado"
                        name="estado"
                        checked={formData.estado}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="estado" className="text-sm">Activo</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/staff")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Personal"}
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