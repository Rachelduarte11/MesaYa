"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable } from "@/components/ui/data-table"
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

interface DocumentType {
  id: number
  code: string
  name: string
  createdAt: string
}

export default function DocumentTypePage() {
  const router = useRouter()
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([
    {
      id: 1,
      code: "DNI",
      name: "Documento Nacional de Identidad",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      code: "CE",
      name: "Carnet de Extranjería",
      createdAt: "2024-03-15",
    },
    {
      id: 3,
      code: "PAS",
      name: "Pasaporte",
      createdAt: "2024-03-15",
    }
  ])
  const [documentTypeToDelete, setDocumentTypeToDelete] = useState<DocumentType | null>(null)

  const columns = [
    {
      header: "Código",
      accessorKey: "code" as keyof DocumentType,
    },
    {
      header: "Nombre",
      accessorKey: "name" as keyof DocumentType,
    },
    {
      header: "Fecha de Creación",
      accessorKey: "createdAt" as keyof DocumentType,
    },
  ]

  const handleDelete = (documentType: DocumentType) => {
    setDocumentTypes(documentTypes.filter(d => d.id !== documentType.id))
    setDocumentTypeToDelete(null)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Tipos de Documento" }
            ]} 
          />
          <DataTable<DocumentType>
            columns={columns}
            data={documentTypes}
            title="Tipos de Documento"
            onAdd={() => {
              router.push("/settings/document-type/add")
            }}
            onEdit={(item: DocumentType) => {
              router.push(`/settings/document-type/${item.id}/edit`)
            }}
            onDelete={(item: DocumentType) => {
              setDocumentTypeToDelete(item)
            }}
          />
        </div>
      </div>

      <AlertDialog open={!!documentTypeToDelete} onOpenChange={() => setDocumentTypeToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el tipo de documento "{documentTypeToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => documentTypeToDelete && handleDelete(documentTypeToDelete)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 