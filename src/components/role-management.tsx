"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, UserCog, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useRoleManagement } from "@/hooks/useRoleManagement"
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
import { useState } from "react"
import { Rol } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"

interface RoleManagementProps {
  showAll?: boolean;
}

export function RoleManagement({ showAll = false }: RoleManagementProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Rol | null>(null)

  const {
    roles,
    loading,
    error,
    currentPage,
    totalPages,
    fetchRoles,
    fetchActiveRoles,
    handleSearch,
    handleDelete,
    handlePageChange,
  } = useRoleManagement()

  useEffect(() => {
    if (showAll) {
      fetchRoles()
    } else {
      fetchActiveRoles()
    }
  }, [fetchRoles, fetchActiveRoles, showAll])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    handleSearch(term)
  }

  const handleDeleteClick = (role: Rol) => {
    setSelectedRole(role)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedRole) {
      try {
        await handleDelete(Number(selectedRole.codigo))
        setIsDeleteModalOpen(false)
        setSelectedRole(null)
      } catch (err) {
        console.error('Error deleting role:', err)
      }
    }
  }

  if (loading && !roles.length) {
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
        <CardTitle>{showAll ? "Todos los Roles" : "Gestión de Roles"}</CardTitle>
        <CardDescription>
          {showAll ? "Lista completa de roles" : "Administra los roles del sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => router.push("/settings/role/add")}>
            <UserCog className="mr-2 h-4 w-4" />
            Nuevo Rol
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No hay roles disponibles
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.codigo}>
                  <TableCell>{role.codigo}</TableCell>
                  <TableCell>{role.nombre}</TableCell>
                  <TableCell>
                    <Badge
                      className={role.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {role.estado ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/settings/role/${role.codigo}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(role)}
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el rol "{selectedRole?.nombre}".
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