"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    const id = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1
    const today = new Date().toISOString().split("T")[0]

    setEmployees([
      ...employees,
      {
        ...newEmployee,
        id,
        startDate: today,
        status: "Active",
      },
    ])

    setNewEmployee({ name: "", position: "", phone: "", email: "" })
    setIsAddDialogOpen(false)
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus2 className="mr-2 h-4 w-4" /> Add New Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the employee's information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, position: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Chef">Chef</SelectItem>
                    <SelectItem value="Waitstaff">Waitstaff</SelectItem>
                    <SelectItem value="Bartender">Bartender</SelectItem>
                    <SelectItem value="Host">Host</SelectItem>
                    <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddEmployee}>
                Save Employee
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                        <BadgeCheck className="h-4 w-4" />
                      </Button>
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

