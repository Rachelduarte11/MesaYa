"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { VerTodosRegistros } from "@/components/ui/buttons/ver-todos-registros"

export interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title?: string
  description?: string
  data: any[]
  columns: Column[]
  loading: boolean
  error: string | null
  onDelete: (id: string) => Promise<void>
  showAll?: boolean
  searchInputProps?: any
  searchPlaceholder?: string
  allRecordsPath?: string
  addButtonPath?: string
  addButtonLabel?: string
  emptyMessage?: string
  deleteConfirmationMessage?: string
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  searchRegister?: any
}

export function DataTable({ 
  title,
  description,
  data = [], 
  columns,
  loading, 
  error, 
  onDelete,
  showAll = false,
  searchInputProps,
  searchPlaceholder = "Buscar...",
  allRecordsPath,
  addButtonPath,
  addButtonLabel,
  emptyMessage = "No hay registros disponibles",
  deleteConfirmationMessage = "Esta acción no se puede deshacer. Se eliminará permanentemente el registro.",
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  searchRegister
}: DataTableProps) {
  const router = useRouter()
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Filter out the 'estado' column from display
  const visibleColumns = columns.filter(column => column.key !== 'estado')

  // Ensure 'estado' is always true in the data
  const processedData = data.map(item => ({
    ...item,
    estado: true
  }))

  const handleDeleteClick = (item: any) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        await onDelete(selectedItem.codigo)
        setIsDeleteModalOpen(false)
        setSelectedItem(null)
      } catch (err) {
        console.error('Error in handleDelete:', err)
      }
    }
  }

  if (loading && !data.length) {
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
      {(title || description) && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
    
        </CardHeader>
      )}
      <CardContent>
        <div className="flex justify-between items-center mb-4 mt-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={searchPlaceholder}
              {...(searchRegister || searchInputProps)}
              className="pl-8"
            />
          </div>
          {addButtonPath && (
            <Button onClick={() => router.push(addButtonPath)}>
              {addButtonLabel || "Nuevo Registro"}
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} className="text-center py-4">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((item) => (
                <TableRow key={item.codigo}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render 
                        ? column.render(item[column.key], item)
                        : item[column.key]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/${allRecordsPath?.split('/')[1] || 'personnel'}/${item.codigo}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(item)}
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

        {onPageChange && totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(currentPage + 1)}
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
              {deleteConfirmationMessage}
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