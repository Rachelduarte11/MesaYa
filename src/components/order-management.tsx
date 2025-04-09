import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, Pencil } from 'lucide-react';
import { Pedido } from '@/services/api/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { usePedidoManagement } from '@/hooks/usePedidoManagement';

interface OrderManagementProps {
  onEdit?: (pedido: Pedido) => void;
}

export function OrderManagement({ onEdit }: OrderManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  
  const {
    loading,
    error,
    pedidos,
    fetchPedidos,
    deletePedido,
    searchPedidos
  } = usePedidoManagement();

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    searchPedidos(term);
  };

  const handleDeleteClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPedido) {
      deletePedido(selectedPedido.codigo);
      setDeleteDialogOpen(false);
      setSelectedPedido(null);
    }
  };

  const handleEditClick = (pedido: Pedido) => {
    if (onEdit) {
      onEdit(pedido);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getClientName = (pedido: Pedido) => {
    if (pedido.cliente) {
      return `${pedido.cliente.nombre} ${pedido.cliente.apellido}`;
    }
    return `Cliente ${pedido.cliente_id}`;
  };

  const getEmployeeName = (pedido: Pedido) => {
    if (pedido.empleado) {
      return `${pedido.empleado.nombre} ${pedido.empleado.apellidoPaterno}`;
    }
    return `Empleado ${pedido.empleado_id}`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado Pedido</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Empleado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : pedidos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No se encontraron pedidos
                </TableCell>
              </TableRow>
            ) : (
              pedidos.map((pedido) => (
                <TableRow key={pedido.codigo}>
                  <TableCell>{pedido.codigo}</TableCell>
                  <TableCell>{pedido.estado ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell>{pedido.nombre}</TableCell>
                  <TableCell>{formatDate(pedido.fecha)}</TableCell>
                  <TableCell>{pedido.estado_pedido}</TableCell>
                  <TableCell>S/. {pedido.total.toFixed(2)}</TableCell>
                  <TableCell>{getClientName(pedido)}</TableCell>
                  <TableCell>{getEmployeeName(pedido)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(pedido)}
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(pedido)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el pedido
              {selectedPedido && ` "${selectedPedido.nombre}"`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
} 