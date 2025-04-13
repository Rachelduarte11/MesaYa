"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/breadcrumb"
import { DistrictManagement } from "@/components/district-management"

export default function AllDistrictsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb 
            items={[
              { label: "Catálogo", href: "/settings" }, 
              { label: "Distritos", href: "/settings/district" },
              { label: "Todos los Distritos" }
            ]} 
          />
          <div className="mt-6">
            <DistrictManagement showAll={true} />
          </div>
        </div>
      </div>
    </div>
  )
} 