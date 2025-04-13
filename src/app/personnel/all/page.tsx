"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { empleadoService } from "@/services/empleados/empleadoService"
import { Empleado } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export default function AllPersonnelPage() {
  const [employees, setEmployees] = useState<Empleado[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        setLoading(true)
        const response = await empleadoService.getAll()
        setEmployees(response)
      } catch (err) {
        setError('Error al cargar los empleados')
        console.error('Error fetching employees:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllEmployees()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <SidebarNav />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Todos los Registros de Personal</CardTitle>
              <CardDescription>
                Lista completa de todos los empleados (activos e inactivos)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Sueldo</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.codigo}>
                      <TableCell>
                        {employee.nombre} {employee.apellidoPaterno} {employee.apellidoMaterno}
                      </TableCell>
                      <TableCell>{employee.documento}</TableCell>
                      <TableCell>{employee.telefono}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>S/. {employee.sueldo.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          className={employee.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {employee.estado ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 