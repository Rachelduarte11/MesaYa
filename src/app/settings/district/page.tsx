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

interface District {
  id: number
  code: string
  name: string
  createdAt: string
  province: string
  department: string
}

export default function DistrictPage() {
  const router = useRouter()
  const [districts, setDistricts] = useState<District[]>([
    {
      id: 1,
      code: "SJL",
      name: "San Juan de Lurigancho",
      province: "Lima",
      department: "Lima",
      createdAt: "2024-03-15",
    },
    {
      id: 2,
      code: "MIR",
      name: "Miraflores",
      province: "Lima",
      department: "Lima",
      createdAt: "2024-03-15",
    },
    {
      id: 3,
      code: "SMP",
      name: "San Martín de Porres",
      province: "Lima",
      department: "Lima",
      createdAt: "2024-03-15",
    },
    {
      id: 4,
      code: "BAR",
      name: "Barranco",
      province: "Lima",
      department: "Lima",
      createdAt: "2024-03-15",
    }
  ])
  const [districtToDelete, setDistrictToDelete] = useState<District | null>(null)

  const columns = [
    {
      header: "Código",
      accessorKey: "code" as keyof District,
    },
    {
      header: "Nombre del Distrito",
      accessorKey: "name" as keyof District,
    },
    {
      header: "Provincia",
      accessorKey: "province" as keyof District,
    },
    {
      header: "Departamento",
      accessorKey: "department" as keyof District,
    },
    {
      header: "Fecha de Creación",
      accessorKey: "createdAt" as keyof District,
    },
  ]

  const handleDelete = (district: District) => {
    setDistricts(districts.filter(d => d.id !== district.id))
    setDistrictToDelete(null)
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
              { label: "Distritos" }
            ]} 
          />
          <DataTable<District>
            columns={columns}
            data={districts}
            title="Distritos"
            onAdd={() => {
              router.push("/settings/district/add")
            }}
            onEdit={(item: District) => {
              router.push(`/settings/district/${item.id}/edit`)
            }}
            onDelete={(item: District) => {
              setDistrictToDelete(item)
            }}
          />
        </div>
      </div>

      <AlertDialog open={!!districtToDelete} onOpenChange={() => setDistrictToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el distrito "{districtToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => districtToDelete && handleDelete(districtToDelete)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}