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

export default function AddClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    numerodocumento: "",
    fechanacimiento: "",
    direccion: "",
    telefono: "",
    celular: "",
    correo: "",
    estado: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      console.log("Client data submitted:", formData)
      setIsSubmitting(false)
      router.push("/clients")
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
              { label: "Clientes", href: "/clients" }, 
              { label: "Agregar Cliente" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Cliente</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
              <CardDescription>
                Complete los datos del nuevo cliente
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
                  onClick={() => router.push("/clients")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar Cliente"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 