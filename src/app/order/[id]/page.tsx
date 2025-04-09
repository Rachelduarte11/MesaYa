'use client';

import { usePedidoManagement } from '@/hooks/usePedidoManagement';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const {
    currentPedido: pedido,
    loading,
    error,
    fetchPedido,
    deletePedido
  } = usePedidoManagement();

  useEffect(() => {
    if (id) {
      fetchPedido(Number(id));
    }
  }, [id, fetchPedido]);

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Pedido no encontrado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles del Pedido</h1>
        <div className="flex gap-2">
          <Link href={`/order/${id}/edit`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
          <Button variant="destructive" onClick={() => deletePedido(pedido.codigo)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">ID:</p>
              <p>{pedido.codigo}</p>
            </div>
            <div>
              <p className="font-semibold">Estado:</p>
              <p>{pedido.estado ? 'Activo' : 'Inactivo'}</p>
            </div>
            <div>
              <p className="font-semibold">Nombre:</p>
              <p>{pedido.nombre}</p>
            </div>
            <div>
              <p className="font-semibold">Fecha:</p>
              <p>{new Date(pedido.fecha).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Estado del Pedido:</p>
              <p>{pedido.estado_pedido}</p>
            </div>
            <div>
              <p className="font-semibold">Total:</p>
              <p>S/. {pedido.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-semibold">ID Cliente:</p>
              <p>{pedido.cliente_id}</p>
            </div>
            <div>
              <p className="font-semibold">ID Empleado:</p>
              <p>{pedido.empleado_id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 