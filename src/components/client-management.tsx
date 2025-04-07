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
import { Search, FileText, Edit, Trash2, UserPlus } from "lucide-react"

// Sample client data
const initialClients = [
  {
    id: 1,
    name: "Floyd Miles",
    phone: "555-123-4567",
    email: "floyd@example.com",
    address: "123 Main St, Anytown",
    visits: 8,
    lastVisit: "2025-04-01",
  },
  {
    id: 2,
    name: "Jane Cooper",
    phone: "555-987-6543",
    email: "jane@example.com",
    address: "456 Oak Ave, Somewhere",
    visits: 12,
    lastVisit: "2025-04-05",
  },
  {
    id: 3,
    name: "Esther Howard",
    phone: "555-456-7890",
    email: "esther@example.com",
    address: "789 Pine Rd, Elsewhere",
    visits: 5,
    lastVisit: "2025-03-28",
  },
]

export function ClientManagement() {
  const [clients, setClients] = useState(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<null | (typeof initialClients)[0]>(null)
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClient = () => {
    const id = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) + 1 : 1
    const today = new Date().toISOString().split("T")[0]

    setClients([
      ...clients,
      {
        ...newClient,
        id,
        visits: 1,
        lastVisit: today,
      },
    ])

    setNewClient({ name: "", phone: "", email: "", address: "" })
    setIsAddDialogOpen(false)
  }

  const handleCreateBill = () => {
    // In a real app, this would create a bill for the selected client
    // and potentially integrate with the cart/order system
    setIsBillDialogOpen(false)
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <UserPlus className="mr-2 h-4 w-4" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Enter the client's information below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddClient}>
                Save Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Database</CardTitle>
          <CardDescription>Manage your restaurant clients and create bills</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.visits}</TableCell>
                  <TableCell>{client.lastVisit}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog
                        open={isBillDialogOpen && selectedClient?.id === client.id}
                        onOpenChange={(open) => {
                          setIsBillDialogOpen(open)
                          if (open) setSelectedClient(client)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Bill for {client.name}</DialogTitle>
                            <DialogDescription>
                              Generate a bill for this client based on their current order.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="mb-4">
                              <Label>Client Information</Label>
                              <div className="text-sm mt-1">
                                <p>
                                  <strong>Name:</strong> {client.name}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {client.phone}
                                </p>
                                <p>
                                  <strong>Email:</strong> {client.email}
                                </p>
                              </div>
                            </div>

                            <div className="mb-4">
                              <Label>Current Order</Label>
                              <div className="text-sm mt-1 p-3 border rounded-md">
                                <p>Table 4</p>
                                <p>4 Items</p>
                                <p>Total: $61.96</p>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="notes">Additional Notes</Label>
                              <Input id="notes" className="mt-1" placeholder="Add any special notes for this bill" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsBillDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateBill}>
                              Generate Bill
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

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
            Showing {filteredClients.length} of {clients.length} clients
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

