"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable } from "@/components/ui/data-table"

interface District {
  id: number
  code: string
  name: string
  createdAt: string
  province: string
  department: string
}

export default function DistrictPage() {
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

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/catalog" }, 
              { label: "Distritos" }
            ]} 
          />
          <DataTable<District>
            columns={columns}
            data={districts}
            title="Distritos"
            onAdd={() => {
              // Add implementation
              console.log("Add new district")
            }}
            onEdit={(item: District) => {
              // Edit implementation
              console.log("Edit district", item)
            }}
            onDelete={(item: District) => {
              // Delete implementation
              console.log("Delete district", item)
            }}
          />
        </div>
      </div>
    </div>
  )
}