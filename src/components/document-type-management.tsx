"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, FileText, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useDocumentTypeManagement } from "@/hooks/useDocumentTypeManagement"
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
import { TipoDocumento } from "@/services/api/types"
import { Badge } from "@/components/ui/badge"

interface DocumentTypeManagementProps {
  showAll?: boolean;
}

export function DocumentTypeManagement({ showAll = false }: DocumentTypeManagementProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedDocumentType, setSelectedDocumentType] = useState<TipoDocumento | null>(null)

  const {
    documentTypes,
    loading,
    error,
    currentPage,
    totalPages,
    fetchDocumentTypes,
    fetchActiveDocumentTypes,
    handleSearch,
    handleDelete,
    handlePageChange,
  } = useDocumentTypeManagement()

  useEffect(() => {
    if (showAll) {
      fetchDocumentTypes()
    } else {
      fetchActiveDocumentTypes()
    }
  }, [fetchDocumentTypes, fetchActiveDocumentTypes, showAll])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    handleSearch(term)
  }

  const handleDeleteClick = (documentType: TipoDocumento) => {
    setSelectedDocumentType(documentType)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedDocumentType) {
      try {
        await handleDelete(Number(selectedDocumentType.codigo))
        setIsDeleteModalOpen(false)
        setSelectedDocumentType(null)
      } catch (err) {
        console.error('Error deleting document type:', err)
      }
    }
  }

  if (loading && !documentTypes.length) {
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
        <CardTitle>{showAll ? "Todos los Tipos de Documento" : "Gestión de Tipos de Documento"}</CardTitle>
        <CardDescription>
          {showAll ? "Lista completa de tipos de documento" : "Administra los tipos de documento del sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar tipos de documento..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button onClick={() => router.push("/settings/document-type/add")}>
            <FileText className="mr-2 h-4 w-4" />
            Nuevo Tipo de Documento
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
            {documentTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No hay tipos de documento disponibles
                </TableCell>
              </TableRow>
            ) : (
              documentTypes.map((docType) => (
                <TableRow key={docType.codigo}>
                  <TableCell>{docType.codigo}</TableCell>
                  <TableCell>{docType.nombre}</TableCell>
                  <TableCell>
                    <Badge
                      className={docType.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {docType.estado ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/settings/document-type/${docType.codigo}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(docType)}
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
              Esta acción no se puede deshacer. Se eliminará permanentemente el tipo de documento "{selectedDocumentType?.nombre}".
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