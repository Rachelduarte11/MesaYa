"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { platoService } from "@/services/platos/platoService"
import { Plato } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import { useRouter } from "next/navigation"

export default function AllPlatesPage() {
  const router = useRouter()
  const [plates, setPlates] = useState<Plato[]>([])
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
            <Button onClick={() => router.push("/plates/add")}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Plato
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Todos los Registros de Platos</CardTitle>
              <CardDescription>
                Lista completa de todos los platos (activos e inactivos)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plates.map((plate) => (
                    <TableRow key={plate.codigo}>
                      <TableCell className="font-medium">{plate.nombre}</TableCell>
                      <TableCell>{plate.descripcion}</TableCell>
                      <TableCell>S/. {plate.precio.toFixed(2)}</TableCell>
                      <TableCell>{plate.tipoPlato.nombre}</TableCell>
                      <TableCell>
                        <Badge
                          className={plate.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {plate.estado ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 