"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, UserPlus2, ChevronLeft, ChevronRight } from "lucide-react"

// Sample client data
const initialClients = [
  {
    id: 1,
    name: "Juan Pérez",
    documentType: "DNI",
    documentNumber: "12345678",
    gender: "M",
    district: "Miraflores",
    phone: "555-111-2222",
    email: "juan@example.com",
    address: "Av. Arequipa 123",
    status: "Active",
  },
  {
    id: 2,
    name: "María García",
    documentType: "CE",
    documentNumber: "87654321",
    gender: "F",
    district: "San Isidro",
    phone: "555-333-4444",
    email: "maria@example.com",
    address: "Av. Javier Prado 456",
    status: "Active",
  },
  {
    id: 3,
    name: "Carlos López",
    documentType: "DNI",
    documentNumber: "11223344",
    gender: "M",
    district: "Barranco",
    phone: "555-555-6666",
    email: "carlos@example.com",
    address: "Av. Diagonal 789",
    status: "Active",
  },
  {
    id: 4,
    name: "Ana Torres",
    documentType: "DNI",
    documentNumber: "99887766",
    gender: "F",
    district: "Surco",
    phone: "555-777-8888",
    email: "ana@example.com",
    address: "Av. Primavera 321",
    status: "Active",
  },
  // Adding more sample data to demonstrate pagination
  {
    id: 5,
    name: "Roberto Silva",
    documentType: "CE",
    documentNumber: "55443322",
    gender: "M",
    district: "La Molina",
    phone: "555-999-0000",
    email: "roberto@example.com",
    address: "Av. La Molina 654",
    status: "Active",
  },
  {
    id: 6,
    name: "Laura Mendoza",
    documentType: "DNI",
    documentNumber: "11223355",
    gender: "F",
    district: "San Borja",
    phone: "555-222-3333",
    email: "laura@example.com",
    address: "Av. Aviación 987",
    status: "Active",
  },
  {
    id: 7,
    name: "Pedro Ríos",
    documentType: "PAS",
    documentNumber: "AB123456",
    gender: "M",
    district: "Miraflores",
    phone: "555-444-5555",
    email: "pedro@example.com",
    address: "Av. Benavides 147",
    status: "Active",
  },
  {
    id: 8,
    name: "Sofia Castro",
    documentType: "DNI",
    documentNumber: "66778899",
    gender: "F",
    district: "San Isidro",
    phone: "555-666-7777",
    email: "sofia@example.com",
    address: "Av. Javier Prado 258",
    status: "Active",
  },
  {
    id: 9,
    name: "Miguel Flores",
    documentType: "CE",
    documentNumber: "11223366",
    gender: "M",
    district: "Barranco",
    phone: "555-888-9999",
    email: "miguel@example.com",
    address: "Av. Diagonal 369",
    status: "Active",
  },
  {
    id: 10,
    name: "Carmen Ruiz",
    documentType: "DNI",
    documentNumber: "44556677",
    gender: "F",
    district: "Surco",
    phone: "555-000-1111",
    email: "carmen@example.com",
    address: "Av. Primavera 741",
    status: "Active",
  }
]

export function ClientManagement() {
  const router = useRouter()
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.documentNumber.includes(searchTerm)
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search clients..."
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
          <UserPlus2 className="mr-2 h-4 w-4" /> Add New Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Client Database</CardTitle>
            <CardDescription>Manage your restaurant clients</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Document Number</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.documentType}</TableCell>
                  <TableCell>{client.documentNumber}</TableCell>
                  <TableCell>{client.gender}</TableCell>
                  <TableCell>{client.district}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredClients.length)} of {filteredClients.length} clients
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
  )
}

