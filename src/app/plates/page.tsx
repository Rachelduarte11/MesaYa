"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable, Column } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { platoService } from "@/services/platos/platoService"
import { Plato } from "@/services/api/types"
import debounce from "lodash/debounce"

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { key: "codigo", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { 
    key: "tipoPlato", 
    label: "Tipo",
    render: (value) => value.nombre
  },
  { 
    key: "precio", 
    label: "Precio",
    render: (value) => `S/. ${value ? value.toFixed(2) : '0.00'}`
  },
  { 
    key: "estado", 
    label: "Estado",
    render: (value) => (
      <Badge className={value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {value ? 'Activo' : 'Inactivo'}
      </Badge>
    )
  }
]

export default function PlatesPage() {
  const router = useRouter()
  const [plates, setPlates] = useState<Plato[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")

  const fetchPlates = useCallback(async (query?: string) => {
    try {
      setLoading(true)
      const data = query 
        ? await platoService.search(query)
        : await platoService.getAllActive()
      setPlates(data)
    } catch (err) {
      setError("Error al cargar los platos")
      console.error("Error fetching plates:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await platoService.delete(id)
      setPlates(plates.filter(plate => plate.codigo !== id))
    } catch (err) {
      setError("Error al eliminar el plato")
      console.error("Error deleting plate:", err)
    }
  }

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      fetchPlates(query)
    }, 500),
    [fetchPlates]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchPlates()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchPlates])

  useEffect(() => {
    fetchPlates()
  }, [fetchPlates])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb 
              items={[
                { label: "Inicio", href: "/" },
                { label: "Platos", href: "/plates" }
              ]} 
            />
          </div>
          <DataTable
            title="Platos Activos"
            description="Administre los platos activos del restaurante"
            data={plates}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            allRecordsPath="/plates/all"
            addButtonPath="/plates/add"
            addButtonLabel="Nuevo Plato"
            searchPlaceholder="Buscar platos..."
            searchInputProps={register("search")}
            emptyMessage="No hay platos disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el plato."
          />
        </div>
      </div>
    </div>
  )
}

