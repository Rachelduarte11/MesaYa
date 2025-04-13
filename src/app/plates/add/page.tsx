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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { platoService } from "@/services/platos/platoService"
import { tipoPlatoService } from "@/services/tipoPlatos/tipoPlatoService"
import { CreatePlatoRequest, TipoPlato } from "@/services/api/types"
import { Loader2 } from "lucide-react"

export default function AddPlatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tipoPlatos, setTipoPlatos] = useState<TipoPlato[]>([])
  const [formData, setFormData] = useState<CreatePlatoRequest>({
    nombre: "",
    descripcion: "",
    precio: 0,
    estado: true,
    tipoPlato: {
      codigo: 0
    }
  })

  useEffect(() => {
    const fetchTipoPlatos = async () => {
      try {
        setLoading(true)
        const response = await tipoPlatoService.getAllActive()
        setTipoPlatos(response)
        // Set default tipoPlato if available
        if (response.length > 0) {
          setFormData(prev => ({
            ...prev,
            tipoPlato: {
              codigo: response[0].codigo
            }
          }))
        }
      } catch (err) {
        setError("Error al cargar los tipos de plato")
        console.error("Error fetching plate types:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTipoPlatos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await platoService.create(formData)
      router.push("/plates")
    } catch (err) {
      setError("Error al crear el plato")
      console.error("Error creating plate:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      tipoPlato: {
        codigo: parseInt(value)
      }
    }))
  }

  if (loading && tipoPlatos.length === 0) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
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
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" },
                { label: "Platos", href: "/plates" },
                { label: "Nuevo Plato", href: "/plates/add" }
              ]} 
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Plato</CardTitle>
              <CardDescription>
                Complete los datos para crear un nuevo plato
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="tipoPlato">Tipo de Plato</Label>
                    <Select
                      value={formData.tipoPlato.codigo.toString()}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo de plato" />
                      </SelectTrigger>
                      <SelectContent>
                        {tipoPlatos.map((tipo) => (
                          <SelectItem key={tipo.codigo} value={tipo.codigo.toString()}>
                            {tipo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio (S/.)</Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.precio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/plates")}
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
    </div>
  )
} 