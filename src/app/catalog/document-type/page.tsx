"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable } from "@/components/ui/data-table"

interface DocumentType {
  id: number
  code: string
  name: string
  createdAt: string
}

export default function DocumentTypePage() {
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

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/catalog" }, 
              { label: "Tipos de Documento" }
            ]} 
          />
          <DataTable<DocumentType>
            columns={columns}
            data={documentTypes}
            title="Tipos de Documento"
            onAdd={() => {
              // Add implementation
              console.log("Add new document type")
            }}
            onEdit={(item: DocumentType) => {
              // Edit implementation
              console.log("Edit document type", item)
            }}
            onDelete={(item: DocumentType) => {
              // Delete implementation
              console.log("Delete document type", item)
            }}
          />
        </div>
      </div>
    </div>
  )
} 