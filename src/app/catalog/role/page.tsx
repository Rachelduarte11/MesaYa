"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable } from "@/components/ui/data-table"

interface Role {
  id: number
  code: string
  name: string
  createdAt: string
}

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      code: "ADM",
      name: "Administrador",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      code: "MESERO",
      name: "Mesero",
      createdAt: "2024-03-15",
    },
    {
      id: 3,
      code: "COCINA",
      name: "Personal de Cocina",
      createdAt: "2024-03-15",
    }
  ])

  const columns = [
    {
      header: "Código",
      accessorKey: "code" as keyof Role,
    },
    {
      header: "Nombre",
      accessorKey: "name" as keyof Role,
    },
    {
      header: "Fecha de Creación",
      accessorKey: "createdAt" as keyof Role,
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
              { label: "Roles / Posiciones" }
            ]} 
          />
          <DataTable<Role>
            columns={columns}
            data={roles}
            title="Roles / Posiciones"
            onAdd={() => {
              // Add implementation
              console.log("Add new role")
            }}
            onEdit={(item: Role) => {
              // Edit implementation
              console.log("Edit role", item)
            }}
            onDelete={(item: Role) => {
              // Delete implementation
              console.log("Delete role", item)
            }}
          />
        </div>
      </div>
    </div>
  )
} 