"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DocumentTypeManagement } from "@/components/document-type-management"

export default function AllDocumentTypesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Tipos de Documento", href: "/settings/document-type" },
              { label: "Todos los Tipos de Documento" }
            ]} 
          />
          <div className="mt-6">
            <DocumentTypeManagement showAll={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 