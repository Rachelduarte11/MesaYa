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

interface Role {
  id: number
  code: string
  name: string
  createdAt: string
}

export default function RolePage() {
  const router = useRouter()
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
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)

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

  const handleDelete = (role: Role) => {
    setRoles(roles.filter(r => r.id !== role.id))
    setRoleToDelete(null)
  }

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
              router.push("/catalog/role/add")
            }}
            onEdit={(item: Role) => {
              router.push(`/catalog/role/${item.id}/edit`)
            }}
            onDelete={(item: Role) => {
              setRoleToDelete(item)
            }}
          />
        </div>
      </div>

      <AlertDialog open={!!roleToDelete} onOpenChange={() => setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el rol "{roleToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => roleToDelete && handleDelete(roleToDelete)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 