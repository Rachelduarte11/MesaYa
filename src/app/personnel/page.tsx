"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { EmployeeManagement } from "@/components/employee-management"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/breadcrumb"

export default function StaffManagementPage() {
  const router = useRouter()

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" }, 
                { label: "Personal", href: "/personnel" }
              ]} 
            />
            <Button 
              variant="outline"
              className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
              onClick={() => router.push('/personnel/all')}
            >
              Ver todos los registros
            </Button>
          </div>
          <EmployeeManagement />
        </div>
      </div>
    </div>
  )
}

