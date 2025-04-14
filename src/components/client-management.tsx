"use client"

import { useState, useEffect } from "react"
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
import { Badge } from "@/components/ui/badge"

interface ClientManagementProps {
  clients: Cliente[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  showAll?: boolean
  searchInputProps?: any
}

export function ClientManagement({ 
  clients = [], 
  loading, 
  error, 
  onDelete,
  showAll = false,
  searchInputProps
}: ClientManagementProps) {
  const router = useRouter()
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Filter clients based on showAll prop
  const displayedClients = showAll ? clients : clients.filter(client => client.estado === true);

  useEffect(() => {
    console.log('ClientManagement: Clients updated:', clients);
  }, [clients]);

  const handleDeleteClick = (client: Cliente) => {
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (selectedClient) {
      try {
        await onDelete(selectedClient.codigo);
        setIsDeleteModalOpen(false);
        setSelectedClient(null);
      } catch (err) {
        console.error('ClientManagement: Error in handleDelete:', err);
      }
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
    <Card>
      <CardHeader>
        <CardTitle>{showAll ? "Todos los Clientes" : "Gestión de Clientes"}</CardTitle>
        <CardDescription>
          {showAll ? "Lista completa de clientes" : "Administra los clientes del restaurante"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar clientes..."
              {...searchInputProps}
              className="pl-8"
            />
          </div>
          <Button onClick={() => router.push("/clients/add")}>
            <UserPlus2 className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No hay clientes disponibles
                </TableCell>
              </TableRow>
            ) : (
              displayedClients.map((client) => (
                <TableRow key={client.codigo}>
                  <TableCell>
                    {client.nombre} {client.apellidoPaterno} {client.apellidoMaterno}
                  </TableCell>
                  <TableCell>{client.documento}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.direccion}</TableCell>
                  <TableCell>
                    <Badge
                      className={client.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {client.estado ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/clients/${client.codigo}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(client)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el cliente "{selectedClient?.nombre} {selectedClient?.apellidoPaterno}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

