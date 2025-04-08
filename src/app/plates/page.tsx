"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus, List } from "lucide-react"
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

// Sample plate data
const initialPlates = [
  {
    id: 1,
    nombre: "Ceviche",
    descripcion: "Pescado fresco en limón",
    precio: 25.90,
    tipoPlato: "Entradas",
    estado: true
  },
  {
    id: 2,
    nombre: "Lomo Saltado",
    descripcion: "Plato típico peruano",
    precio: 45.90,
    tipoPlato: "Platos Principales",
    estado: true
  },
  {
    id: 3,
    nombre: "Suspiro a la Limeña",
    descripcion: "Postre tradicional",
    precio: 15.90,
    tipoPlato: "Postres",
    estado: true
  },
  {
    id: 4,
    nombre: "Chicha Morada",
    descripcion: "Bebida tradicional",
    precio: 8.90,
    tipoPlato: "Bebidas",
    estado: true
  }
]

export default function PlatesPage() {
  const router = useRouter()
  const [plates, setPlates] = useState(initialPlates)
  const [searchTerm, setSearchTerm] = useState("")
  const [plateToDelete, setPlateToDelete] = useState<number | null>(null)

  const filteredPlates = plates.filter(
    (plate) =>
      plate.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plate.tipoPlato.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (plateId: number) => {
    setPlates(plates.filter(plate => plate.id !== plateId))
    setPlateToDelete(null)
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
          <h1 className="text-2xl font-bold mb-6">Gestión de Platos</h1>
          
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
                    <TableRow key={plate.id}>
                      <TableCell className="font-medium">{plate.nombre}</TableCell>
                      <TableCell>{plate.descripcion}</TableCell>
                      <TableCell>S/. {plate.precio.toFixed(2)}</TableCell>
                      <TableCell>{plate.tipoPlato}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            plate.estado 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {plate.estado ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => router.push(`/plates/${plate.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setPlateToDelete(plate.id)}
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
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el plato
                  del menú y todos sus datos asociados.
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

