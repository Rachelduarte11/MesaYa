"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { EmployeeManagement } from "@/components/employee-management"

export default function AllPersonnelPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Inicio", href: "/" }, 
              { label: "Personal", href: "/personnel" },
              { label: "Todos los registros" }
            ]} 
          />
          <div className="mt-6">
            <EmployeeManagement showAll={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 