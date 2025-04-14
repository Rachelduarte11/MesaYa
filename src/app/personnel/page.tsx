"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { Header } from "@/components/header"
import { EmployeeManagement } from "@/components/employee-management"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Breadcrumb } from "@/components/breadcrumb"
import { useForm } from "react-hook-form"
import { useCallback, useEffect } from "react"
import { useEmployeeManagement } from "@/hooks/useEmployeeManagement"
import debounce from "lodash/debounce"

type SearchFormData = {
  search: string
}

export default function StaffManagementPage() {
  const router = useRouter()
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")
  const { 
    employees,
    loading,
    error,
    currentPage,
    totalPages,
    fetchEmployees,
    handleSearch,
    handleDelete,
    handlePageChange
  } = useEmployeeManagement()

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      handleSearch(query)
    }, 500),
    [handleSearch]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchEmployees()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchEmployees])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

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
          <EmployeeManagement 
            employees={employees}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onDelete={handleDelete}
            searchInputProps={register("search")} 
          />
        </div>
      </div>
    </div>
  )
}

