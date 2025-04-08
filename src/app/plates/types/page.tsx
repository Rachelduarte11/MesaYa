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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Plus } from "lucide-react"
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

// Sample plate type data
const initialPlateTypes = [
  {
    id: 1,
    nombre: "Entradas",
    descripcion: "Platos para comenzar la comida",
    estado: true
  },
  {
    id: 2,
    nombre: "Platos Principales",
    descripcion: "Platos principales del menú",
    estado: true
  },
  {
    id: 3,
    nombre: "Postres",
    descripcion: "Dulces y postres",
    estado: true
  },
  {
    id: 4,
    nombre: "Bebidas",
    descripcion: "Bebidas y refrescos",
    estado: true
  }
]

export default function PlateTypesPage() {
  const router = useRouter()
  const [plateTypes, setPlateTypes] = useState(initialPlateTypes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [newType, setNewType] = useState({
    nombre: "",
    descripcion: "",
    estado: true
  })
  const [typeToDelete, setTypeToDelete] = useState<number | null>(null)

  const filteredPlateTypes = plateTypes.filter(
    (type) =>
      type.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddType = () => {
    if (newType.nombre.trim() === "" || newType.descripcion.trim() === "") {
      return
    }

    const id = plateTypes.length > 0 ? Math.max(...plateTypes.map((t) => t.id)) + 1 : 1
    setPlateTypes([...plateTypes, { ...newType, id }])
    setNewType({ nombre: "", descripcion: "", estado: true })
    setIsAdding(false)
  }

  const handleToggleStatus = (id: number) => {
    setPlateTypes(
      plateTypes.map((type) =>
        type.id === id ? { ...type, estado: !type.estado } : type
      )
    )
  }

  const handleDelete = (typeId: number) => {
    setPlateTypes(plateTypes.filter(type => type.id !== typeId))
    setTypeToDelete(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Platos", href: "/plates" }, 
              { label: "Tipos de Plato" }
            ]} 
          />
          <h1 className="text-2xl font-bold mb-6">Tipos de Plato</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Tipos de Plato</CardTitle>
              <CardDescription>
                Administre los diferentes tipos de platos disponibles en el menú
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar tipos de plato..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar Tipo
                </Button>
              </div>

              {isAdding && (
                <div className="mb-6 p-4 border rounded-md bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Nuevo Tipo de Plato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        value={newType.nombre}
                        onChange={(e) => setNewType({ ...newType, nombre: e.target.value })}
                        placeholder="Nombre del tipo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Input
                        id="descripcion"
                        value={newType.descripcion}
                        onChange={(e) => setNewType({ ...newType, descripcion: e.target.value })}
                        placeholder="Descripción del tipo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="estado"
                          checked={newType.estado}
                          onChange={(e) => setNewType({ ...newType, estado: e.target.checked })}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="estado" className="text-sm">Activo</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsAdding(false)
                        setNewType({ nombre: "", descripcion: "", estado: true })
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleAddType}
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlateTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.nombre}</TableCell>
                      <TableCell>{type.descripcion}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            type.estado 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {type.estado ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => router.push(`/plates/types/${type.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setTypeToDelete(type.id)}
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
                Mostrando {filteredPlateTypes.length} de {plateTypes.length} tipos
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push("/plates")}
              >
                Volver a Platos
              </Button>
            </CardFooter>
          </Card>

          <AlertDialog open={typeToDelete !== null} onOpenChange={() => setTypeToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de plato
                  y todos los platos asociados a este tipo deberán ser actualizados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => typeToDelete && handleDelete(typeToDelete)}
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