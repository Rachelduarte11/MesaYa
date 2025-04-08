"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, BadgeCheck, UserPlus2 } from "lucide-react"

// Sample employee data
const initialEmployees = [
  {
    id: 1,
    name: "Maria Rodriguez",
    position: "Waitstaff",
    phone: "555-111-2222",
    email: "maria@chilipos.com",
    startDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "John Smith",
    position: "Chef",
    phone: "555-333-4444",
    email: "john@chilipos.com",
    startDate: "2023-11-05",
    status: "Active",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    position: "Manager",
    phone: "555-555-6666",
    email: "sarah@chilipos.com",
    startDate: "2023-08-20",
    status: "Active",
  },
  {
    id: 4,
    name: "David Lee",
    position: "Bartender",
    phone: "555-777-8888",
    email: "david@chilipos.com",
    startDate: "2024-02-10",
    status: "Active",
  },
]

export function EmployeeManagement() {
  const router = useRouter()
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            onChange={(e) => setSearchTerm(e.target.value)}
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
          <CardTitle>Employee Database</CardTitle>
          <CardDescription>Manage your restaurant staff</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
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
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

