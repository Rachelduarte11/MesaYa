import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, Pencil, Eye } from 'lucide-react';
import { Pedido } from '@/services/api/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePedidoManagement } from '@/hooks/usePedidoManagement';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface OrderManagementProps {
  onEdit?: (pedido: Pedido) => void;
}

export function OrderManagement({ onEdit }: OrderManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const router = useRouter();
  const { pedidos, loading, error, searchPedidos, deletePedido } = usePedidoManagement();

  useEffect(() => {
    searchPedidos('');
  }, [searchPedidos]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    searchPedidos(e.target.value);
  };

  const handleDeleteClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPedido) {
      await deletePedido(selectedPedido.codigo);
      setIsDeleteDialogOpen(false);
      setSelectedPedido(null);
    }
  };

  const getStatusBadge = (estado: boolean) => {
    return (
      <Badge className={estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
        {estado ? 'Activo' : 'Inactivo'}
      </Badge>
    );
  };

  const getEstadoPedidoBadge = (estadoPedido: string) => {
    const statusColors = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'En Proceso': 'bg-blue-100 text-blue-800',
      'Completado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    return (
      <Badge className={statusColors[estadoPedido as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {estadoPedido}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Fecha inválida';
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Gestión de Pedidos</CardTitle>
        <CardDescription>Administre los pedidos del restaurante</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Button onClick={() => router.push('/order/add')}>
            Nuevo Pedido
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Cargando pedidos...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
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
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.codigo}>
                    <TableCell>{pedido.codigo}</TableCell>
                    <TableCell>{pedido.nombre}</TableCell>
                    <TableCell>{formatDate(pedido.fecha)}</TableCell>
                    <TableCell>{getEstadoPedidoBadge(pedido.estadoPedido)}</TableCell>
                    <TableCell>S/. {pedido.total.toFixed(2)}</TableCell>
                    <TableCell>{pedido.clienteNombre}</TableCell>
                    <TableCell>{pedido.empleadoNombre}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedPedido(pedido);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEdit?.(pedido)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(pedido)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente el pedido.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Detalles del Pedido</DialogTitle>
            </DialogHeader>
            {selectedPedido && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Información del Pedido</h3>
                    <div className="space-y-1">
                      <p><span className="font-medium">Código:</span> {selectedPedido.codigo}</p>
                      <p><span className="font-medium">Nombre:</span> {selectedPedido.nombre}</p>
                      <p><span className="font-medium">Fecha:</span> {formatDate(selectedPedido.fecha)}</p>
                      <p><span className="font-medium">Estado:</span> {getEstadoPedidoBadge(selectedPedido.estadoPedido)}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Totales</h3>
                    <div className="space-y-1">
                      <p><span className="font-medium">Total:</span> S/. {selectedPedido.total.toFixed(2)}</p>
                      <p><span className="font-medium">Cliente ID:</span> {selectedPedido.clienteId}</p>
                      <p><span className="font-medium">Empleado ID:</span> {selectedPedido.empleadoId}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Detalles del Pedido</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plato</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio Unitario</TableHead>
                        <TableHead>Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPedido.detalles
                        .filter(detalle => detalle.estado)
                        .map((detalle) => (
                          <TableRow key={detalle.codigo}>
                            <TableCell>{detalle.platoNombre}</TableCell>
                            <TableCell>{detalle.cantidad}</TableCell>
                            <TableCell>S/. {detalle.precioUnitario.toFixed(2)}</TableCell>
                            <TableCell>S/. {detalle.subtotal.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
} 