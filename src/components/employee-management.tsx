"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, BadgeCheck, UserPlus2, ChevronLeft, ChevronRight } from "lucide-react"

// Sample employee data
const initialEmployees = [
  {
    id: 1,
    name: "Maria Rodriguez",
    position: "Waitstaff",
    documentType: "DNI",
    documentNumber: "12345678",
    gender: "F",
    district: "Miraflores",
    phone: "555-111-2222",
    email: "maria@chilipos.com",
    startDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "John Smith",
    position: "Chef",
    documentType: "CE",
    documentNumber: "87654321",
    gender: "M",
    district: "San Isidro",
    phone: "555-333-4444",
    email: "john@chilipos.com",
    startDate: "2023-11-05",
    status: "Active",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    position: "Manager",
    documentType: "DNI",
    documentNumber: "11223344",
    gender: "F",
    district: "Barranco",
    phone: "555-555-6666",
    email: "sarah@chilipos.com",
    startDate: "2023-08-20",
    status: "Active",
  },
  {
    id: 4,
    name: "David Lee",
    position: "Bartender",
    documentType: "DNI",
    documentNumber: "99887766",
    gender: "M",
    district: "Surco",
    phone: "555-777-8888",
    email: "david@chilipos.com",
    startDate: "2024-02-10",
    status: "Active",
  },
  // Adding more sample data to demonstrate pagination
  {
    id: 5,
    name: "Emily Brown",
    position: "Hostess",
    documentType: "CE",
    documentNumber: "55443322",
    gender: "F",
    district: "La Molina",
    phone: "555-999-0000",
    email: "emily@chilipos.com",
    startDate: "2024-01-20",
    status: "Active",
  },
  {
    id: 6,
    name: "Michael Wilson",
    position: "Sous Chef",
    documentType: "DNI",
    documentNumber: "11223355",
    gender: "M",
    district: "San Borja",
    phone: "555-222-3333",
    email: "michael@chilipos.com",
    startDate: "2023-10-15",
    status: "Active",
  },
  {
    id: 7,
    name: "Jessica Davis",
    position: "Waitstaff",
    documentType: "PAS",
    documentNumber: "AB123456",
    gender: "F",
    district: "Miraflores",
    phone: "555-444-5555",
    email: "jessica@chilipos.com",
    startDate: "2024-02-05",
    status: "Active",
  },
  {
    id: 8,
    name: "Robert Taylor",
    position: "Line Cook",
    documentType: "DNI",
    documentNumber: "66778899",
    gender: "M",
    district: "San Isidro",
    phone: "555-666-7777",
    email: "robert@chilipos.com",
    startDate: "2023-12-10",
    status: "Active",
  },
  {
    id: 9,
    name: "Amanda Martinez",
    position: "Cashier",
    documentType: "CE",
    documentNumber: "11223366",
    gender: "F",
    district: "Barranco",
    phone: "555-888-9999",
    email: "amanda@chilipos.com",
    startDate: "2024-01-25",
    status: "Active",
  },
  {
    id: 10,
    name: "Daniel Anderson",
    position: "Dishwasher",
    documentType: "DNI",
    documentNumber: "44556677",
    gender: "M",
    district: "Surco",
    phone: "555-000-1111",
    email: "daniel@chilipos.com",
    startDate: "2024-02-15",
    status: "Active",
  }
]

export function EmployeeManagement() {
  const router = useRouter()
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.documentNumber.includes(searchTerm)
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

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
            placeholder="Search employees..."
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
          onClick={() => router.push("/staff/add")}
        >
          <UserPlus2 className="mr-2 h-4 w-4" /> Add New Employee
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Employee Database</CardTitle>
            <CardDescription>Manage your restaurant staff</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>Document Number</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.documentType}</TableCell>
                  <TableCell>{employee.documentNumber}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.district}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.startDate}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {employee.status}
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} employees
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

