"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, UserPlus2, Loader2 } from "lucide-react"
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
import { Cliente } from "@/services/api/types"

interface ClientManagementProps {
  clients: Cliente[]
  loading: boolean
  error: string | null
  onSearch: (term: string) => void
  onDelete: (id: string) => Promise<void>
}

export function ClientManagement({ 
  clients = [], // Default empty array if undefined
  loading, 
  error, 
  onSearch, 
  onDelete 
}: ClientManagementProps) {
  console.log('ClientManagement rendered with clients:', clients);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)

  // Debug breakpoint condition: clients is undefined or null
  // Right-click here and add conditional breakpoint: clients === undefined || clients === null
  const handleSearch = (term: string) => {
    onSearch(term)
  }

  const handleDelete = async (clientId: string) => {
    try {
      await onDelete(clientId)
      setSelectedClient(null)
    } catch (err) {
      console.error('Error al eliminar el cliente:', err)
    }
  }

  if (loading && !clients.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar clientes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/clients/add")}
        >
          <UserPlus2 className="mr-2 h-4 w-4" /> Agregar Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base de Datos de Clientes</CardTitle>
          <CardDescription>Gestiona los clientes de tu restaurante</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.nombre} {client.apellido}
                  </TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.estado === 'activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => router.push(`/clients/${client.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedClient(client)}
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
            Mostrando {clients.length} clientes
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={selectedClient !== null} onOpenChange={() => setSelectedClient(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el cliente
              y todos sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedClient && handleDelete(selectedClient.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

