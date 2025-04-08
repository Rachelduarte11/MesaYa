"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample client data
const sampleClients = [
  {
    id: 1,
    nombre: "Juan",
    apellidopaterno: "Pérez",
    apellidomaterno: "García",
    numerodocumento: "12345678",
    fechanacimiento: "1990-01-15",
    direccion: "Av. Principal 123",
    telefono: "555-111-2222",
    celular: "999-888-7777",
    correo: "juan@example.com",
    estado: true
  },
  {
    id: 2,
    nombre: "María",
    apellidopaterno: "López",
    apellidomaterno: "Sánchez",
    numerodocumento: "87654321",
    fechanacimiento: "1985-05-20",
    direccion: "Jr. Secundario 456",
    telefono: "555-333-4444",
    celular: "999-777-6666",
    correo: "maria@example.com",
    estado: true
  }
]

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const clientId = parseInt(resolvedParams.id)
  
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

  useEffect(() => {
    // In a real app, this would be an API call
    const client = sampleClients.find(c => c.id === clientId)
    
    if (client) {
      setFormData(client)
    } else {
      // If client not found, redirect to clients page
      router.push("/clients")
    }
  }, [clientId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would be an API call to update the client
    console.log("Updating client:", formData)
    
    // Redirect back to clients page
    router.push("/clients")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    })
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
              { label: "Editar Cliente" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Editar Cliente</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
              <CardDescription>
                Actualice la información del cliente
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
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
                    <Label htmlFor="apellidopaterno">Apellido Paterno</Label>
                    <Input
                      id="apellidopaterno"
                      name="apellidopaterno"
                      value={formData.apellidopaterno}
                      onChange={handleChange}
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numerodocumento">Número de Documento</Label>
                    <Input
                      id="numerodocumento"
                      name="numerodocumento"
                      value={formData.numerodocumento}
                      onChange={handleChange}
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
                    <Input
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="celular">Celular</Label>
                    <Input
                      id="celular"
                      name="celular"
                      value={formData.celular}
                      onChange={handleChange}
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
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Guardar Cambios
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
} 