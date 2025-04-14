'use client';

import { useRouter } from 'next/navigation';
import { SidebarNav } from "@/components/sidebar-nav";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import { usePedidoManagement } from "@/hooks/usePedidoManagement";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import debounce from "lodash/debounce";
import { OrderStatusBadge, StatusBadge } from "@/components/ui/badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2 } from "lucide-react";
import { useOrderManagement } from "@/hooks/useOrderManagement";

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
    render: (value: number) => `S/. ${value ? value.toFixed(2) : '0.00'}`
  },
  { key: "clienteNombre", label: "Cliente" },
  { key: "empleadoNombre", label: "Empleado" }
]

export default function AllOrdersPage() {
  const router = useRouter();
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      search: ""
    }
  });
  const searchTerm = watch("search") || "";
  const { pedidos, loading, error, deletePedido, searchPedidos, fetchPedidos } = usePedidoManagement();

  const handleDelete = async (id: string) => {
    await deletePedido(Number(id));
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchPedidos(term);
    }, 500),
    [searchPedidos]
  );

  useEffect(() => {
    if (!searchTerm || searchTerm.trim() === '') {
      // fetchPedidos();
    } else {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch, fetchPedidos]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Pedidos", href: "/order" }, { label: "Todos los Pedidos" }]} />
          </div>
          <DataTable
            title="Todos los Pedidos"
            description="Administra todos los pedidos del restaurante"
            data={pedidos}
            columns={columns}
            loading={loading}
            error={error}
            onDelete={handleDelete}
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