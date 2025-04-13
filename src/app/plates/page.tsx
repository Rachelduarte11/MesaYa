"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus, List, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { platoService } from "@/services/platos/platoService"
import { Plato } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"

export default function PlatesPage() {
  const router = useRouter()
  const [plates, setPlates] = useState<Plato[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [plateToDelete, setPlateToDelete] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlates = async () => {
      try {
        setLoading(true)
        const data = await platoService.getAll()
        setPlates(data)
      } catch (err) {
        setError("Error al cargar los platos")
        console.error("Error fetching plates:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlates()
  }, [])

  const filteredPlates = plates.filter(
    (plate) =>
      plate.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.tipoPlato.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (codigo: string) => {
    try {
      await platoService.delete(codigo)
      setPlates(plates.filter(plate => plate.codigo !== codigo))
      setPlateToDelete(null)
    } catch (err) {
      setError("Error al eliminar el plato")
      console.error("Error deleting plate:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
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
          <Breadcrumb 
            items={[
              { label: "Platos" }
            ]} 
          />
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Platos</h1>
            <Button 
              variant="outline"
              className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
              onClick={() => router.push('/plates/all')}
            >
              Ver todos los registros
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Menú del Restaurante</CardTitle>
              <CardDescription>
                Administre los platos disponibles en el menú
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar platos..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => router.push("/plates/types")}
                  >
                    <List className="mr-2 h-4 w-4" /> Tipos de Plato
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => router.push("/plates/add")}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Agregar Plato
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlates.map((plate) => (
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
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => router.push(`/plates/${plate.codigo}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setPlateToDelete(plate.codigo)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {filteredPlates.length} de {plates.length} platos
              </div>
            </CardFooter>
          </Card>

          <AlertDialog open={plateToDelete !== null} onOpenChange={() => setPlateToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el plato del menú.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => plateToDelete && handleDelete(plateToDelete)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

