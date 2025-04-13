"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { platoService } from "@/services/platos/platoService"
import { Plato } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function AllPlatesPage() {
  const router = useRouter()
  const [plates, setPlates] = useState<Plato[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllPlates = async () => {
      try {
        setLoading(true)
        const response = await platoService.getAll()
        setPlates(response)
      } catch (err) {
        setError('Error al cargar los platos')
        console.error('Error fetching plates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllPlates()
  }, [])

  const filteredPlates = plates.filter(
    (plate) =>
      plate.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.tipoPlato.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
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

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
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
                { label: "Todos los Registros", href: "/plates/all" }
              ]} 
            />
            <Button 
              variant="outline"
              className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
              onClick={() => router.push('/plates')}
            >
              Ver platos activos
            </Button>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Todos los Registros de Platos</CardTitle>
                <CardDescription>
                  Lista completa de todos los platos (activos e inactivos)
                </CardDescription>
              </div>
              <Button onClick={() => router.push("/plates/add")}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Plato
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-72">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar platos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Costo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No hay platos disponibles
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlates.map((plate) => (
                      <TableRow key={plate.codigo}>
                        <TableCell>{plate.codigo}</TableCell>
                        <TableCell>{plate.nombre}</TableCell>
                        <TableCell>{plate.descripcion}</TableCell>
                        <TableCell>{plate.tipoPlato.nombre}</TableCell>
                        <TableCell>S/. {plate.costo ? plate.costo.toFixed(2) : '0.00'}</TableCell>
                        <TableCell>
                          <Badge className={plate.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {plate.estado ? 'Activo' : 'Inactivo'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => router.push(`/plates/${plate.codigo}/edit`)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 