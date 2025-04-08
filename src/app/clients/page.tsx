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
import { Search, Edit, Trash2, UserPlus2, ChevronLeft, ChevronRight } from "lucide-react"
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

interface Client {
  id: number
  documentType: string
  documentNumber: string
  name: string
  lastName: string
  gender: string
  district: string
  address: string
  phone: string
  email: string
  createdAt: string
}

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      documentType: "DNI",
      documentNumber: "12345678",
      name: "Juan",
      lastName: "Pérez",
      gender: "M",
      district: "Miraflores",
      address: "Av. Arequipa 123",
      phone: "999888777",
      email: "juan.perez@example.com",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      documentType: "CE",
      documentNumber: "87654321",
      name: "María",
      lastName: "García",
      gender: "F",
      district: "San Isidro",
      address: "Av. Javier Prado 456",
      phone: "999777666",
      email: "maria.garcia@example.com",
      createdAt: "2024-03-15",
    },
    {
      id: 3,
      documentType: "DNI",
      documentNumber: "11223344",
      name: "Carlos",
      lastName: "López",
      gender: "M",
      district: "Barranco",
      address: "Av. Grau 789",
      phone: "999666555",
      email: "carlos.lopez@example.com",
      createdAt: "2024-03-15",
    },
    // Adding more sample data to demonstrate pagination
    {
      id: 4,
      documentType: "DNI",
      documentNumber: "99887766",
      name: "Ana",
      lastName: "Martínez",
      gender: "F",
      district: "Surco",
      address: "Av. Primavera 234",
      phone: "999555444",
      email: "ana.martinez@example.com",
      createdAt: "2024-03-16",
    },
    {
      id: 5,
      documentType: "CE",
      documentNumber: "55443322",
      name: "Roberto",
      lastName: "Sánchez",
      gender: "M",
      district: "La Molina",
      address: "Av. La Molina 567",
      phone: "999444333",
      email: "roberto.sanchez@example.com",
      createdAt: "2024-03-16",
    },
    {
      id: 6,
      documentType: "DNI",
      documentNumber: "11223355",
      name: "Laura",
      lastName: "González",
      gender: "F",
      district: "San Borja",
      address: "Av. Aviación 890",
      phone: "999333222",
      email: "laura.gonzalez@example.com",
      createdAt: "2024-03-17",
    },
    {
      id: 7,
      documentType: "PAS",
      documentNumber: "AB123456",
      name: "Michael",
      lastName: "Johnson",
      gender: "M",
      district: "Miraflores",
      address: "Av. Larco 123",
      phone: "999222111",
      email: "michael.johnson@example.com",
      createdAt: "2024-03-17",
    },
    {
      id: 8,
      documentType: "DNI",
      documentNumber: "66778899",
      name: "Patricia",
      lastName: "Ramírez",
      gender: "F",
      district: "San Isidro",
      address: "Av. Javier Prado 456",
      phone: "999111000",
      email: "patricia.ramirez@example.com",
      createdAt: "2024-03-18",
    },
    {
      id: 9,
      documentType: "CE",
      documentNumber: "11223366",
      name: "Fernando",
      lastName: "Torres",
      gender: "M",
      district: "Barranco",
      address: "Av. Grau 789",
      phone: "999000999",
      email: "fernando.torres@example.com",
      createdAt: "2024-03-18",
    },
    {
      id: 10,
      documentType: "DNI",
      documentNumber: "44556677",
      name: "Carmen",
      lastName: "Vargas",
      gender: "F",
      district: "Surco",
      address: "Av. Primavera 234",
      phone: "999888777",
      email: "carmen.vargas@example.com",
      createdAt: "2024-03-19",
    }
  ])
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.documentNumber.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.district.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  const handleDelete = (client: Client) => {
    setClients(clients.filter(c => c.id !== client.id))
    setClientToDelete(null)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Clientes" }
            ]} 
          />
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar clientes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                  }}
                />
              </div>

              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/clients/add")}
              >
                <UserPlus2 className="mr-2 h-4 w-4" /> Agregar Nuevo Cliente
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Base de Datos de Clientes</CardTitle>
                  <CardDescription>Gestiona los clientes del restaurante</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo Doc.</TableHead>
                      <TableHead>N° Documento</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Género</TableHead>
                      <TableHead>Distrito</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Fecha de Registro</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.documentType}</TableCell>
                        <TableCell>{client.documentNumber}</TableCell>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.lastName}</TableCell>
                        <TableCell>{client.gender}</TableCell>
                        <TableCell>{client.district}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.createdAt}</TableCell>
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
                              onClick={() => setClientToDelete(client)}
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
              <CardFooter className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, filteredClients.length)} de {filteredClients.length} clientes
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={!!clientToDelete} onOpenChange={() => setClientToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el cliente "{clientToDelete?.name} {clientToDelete?.lastName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => clientToDelete && handleDelete(clientToDelete)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
