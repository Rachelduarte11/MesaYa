"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useDistrictManagement } from "@/hooks/useDistrictManagement"
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
import { Distrito } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"

interface DistrictManagementProps {
  showAll?: boolean;
}

export function DistrictManagement({ showAll = false }: DistrictManagementProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState<Distrito | null>(null)

  const {
    districts,
    loading,
    error,
    currentPage,
    totalPages,
    fetchDistricts,
    fetchActiveDistricts,
    handleSearch,
    handleDelete,
    handlePageChange,
  } = useDistrictManagement()

  useEffect(() => {
    if (showAll) {
      fetchDistricts()
    } else {
      fetchActiveDistricts()
    }
  }, [fetchDistricts, fetchActiveDistricts, showAll])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    handleSearch(term)
  }

  const handleDeleteClick = (district: Distrito) => {
    setSelectedDistrict(district)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedDistrict) {
      try {
        await handleDelete(Number(selectedDistrict.codigo))
        setIsDeleteModalOpen(false)
        setSelectedDistrict(null)
      } catch (err) {
        console.error('Error deleting district:', err)
      }
    }
  }

  if (loading && !districts.length) {
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
        <CardTitle>{showAll ? "Todos los Distritos" : "Gestión de Distritos"}</CardTitle>
        <CardDescription>
          {showAll ? "Lista completa de distritos" : "Administra los distritos del restaurante"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar distritos..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => router.push("/settings/district/add")}>
            <MapPin className="mr-2 h-4 w-4" />
            Nuevo Distrito
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nombre del Distrito</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {districts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No hay distritos disponibles
                </TableCell>
              </TableRow>
            ) : (
              districts.map((district) => (
                <TableRow key={district.codigo}>
                  <TableCell>{district.codigo}</TableCell>
                  <TableCell>{district.nombre}</TableCell>
                  <TableCell>
                    <Badge
                      className={district.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {district.estado ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/settings/district/${district.codigo}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(district)}
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
              Esta acción no se puede deshacer. Se eliminará permanentemente el distrito "{selectedDistrict?.nombre}".
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