'use client';

import { SidebarNav } from "@/components/sidebar-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { DataTable, Column } from "@/components/data-table"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OrderStatusBadge, StatusBadge } from "@/components/ui/badges";
import { useCallback, useEffect } from "react"
import { usePedidoManagement } from "@/hooks/usePedidoManagement";
import debounce from "lodash/debounce";

type SearchFormData = {
  search: string
}

const columns: Column[] = [
  { key: "codigo", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "fecha", label: "Fecha" },
  { 
    key: "estadoPedido", 
    label: "Estado Pedido",
    render: (value: string) => <OrderStatusBadge status={value as any} />
  },
  { 
    key: "estado", 
    label: "Estado",
    render: (value: string) => <StatusBadge status={value as any} />
  },
  { 
    key: "total", 
    label: "Total",
    render: (value) => `S/. ${value ? value.toFixed(2) : '0.00'}`
  },
  { key: "clienteNombre", label: "Cliente" },
  { key: "empleadoNombre", label: "Empleado" }
]

export default function OrderPage() {
  const router = useRouter();
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  })

  const searchTerm = watch("search")
  const {
    pedidos: orders,
    loading,
    error,
    fetchActivePedidos: fetchActiveOrders,
    deletePedido: originalDeleteOrder,
    searchPedidos: searchOrders
  } = usePedidoManagement()

  const deleteOrder = async (id: string) => {
    await originalDeleteOrder(Number(id))
  }

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      searchOrders(query)
    }, 500),
    [searchOrders]
  )

  useEffect(() => {
    if (searchTerm.trim() === '') {
      // fetchActiveOrders()
    } else {
      debouncedSearch(searchTerm)
    }
  }, [searchTerm, debouncedSearch, fetchActiveOrders])

  useEffect(() => {
    fetchActiveOrders()
  }, [fetchActiveOrders])

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Pedidos", href: "/order" }]} />
          </div>
          <DataTable
            title="Gestión de Pedidos"
            description="Administra los pedidos del restaurante"
            data={orders}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={deleteOrder}
            allRecordsPath="/order/all"
            addButtonPath="/order/add"
            addButtonLabel="Nuevo Pedido"
            searchPlaceholder="Buscar pedidos..."
            searchInputProps={register("search")}
            emptyMessage="No hay pedidos disponibles"
            deleteConfirmationMessage="Esta acción no se puede deshacer. Se eliminará permanentemente el pedido."
          />
        </div>
      </div>
    </div>
  )
} 