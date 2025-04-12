'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePedidoManagement } from '@/hooks/usePedidoManagement';
import { UpdatePedidoRequest, Plato } from '@/services/api/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { platoService } from '@/services/platos/platoService';

export default function EditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentPedido, loading, error, fetchPedido, updatePedido } = usePedidoManagement();
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [selectedPlato, setSelectedPlato] = useState<Plato | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState<UpdatePedidoRequest>({
    codigo: Number(id),
    estado: true,
    estadoPedido: 'Pendiente',
    detalles: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPedido(Number(id));
      fetchPlatos();
    }
  }, [id, fetchPedido]);

  const fetchPlatos = async () => {
    try {
      const response = await platoService.getAll();
      setPlatos(response);
    } catch (err) {
      console.error('Error fetching platos:', err);
    }
  };

  useEffect(() => {
    if (currentPedido) {
      setFormData({
        codigo: currentPedido.codigo,
        estado: currentPedido.estado,
        estadoPedido: currentPedido.estadoPedido,
        detalles: currentPedido.detalles
          .filter(detalle => detalle.estado)
          .map(detalle => ({
            cantidad: detalle.cantidad,
            precioUnitario: detalle.precioUnitario,
            platoId: detalle.platoId,
            platoNombre: detalle.platoNombre
          }))
      });
    }
  }, [currentPedido]);

  const handleSelectChange = (value: string) => {
    const plato = platos.find(p => p.codigo === value);
    if (plato) {
      setSelectedPlato(plato);
    }
  };

  const handleAddPlato = () => {
    if (!selectedPlato || quantity <= 0) return;

    const newDetalle = {
      cantidad: quantity,
      precioUnitario: selectedPlato.precio,
      platoId: Number(selectedPlato.codigo)
    };

    setFormData(prev => ({
      ...prev,
      detalles: [...(prev.detalles || []), newDetalle]
    }));

    // Reset selection
    setSelectedPlato(null);
    setQuantity(1);
  };

  const handleRemovePlato = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detalles: (prev.detalles || []).filter((_, i) => i !== index)
    }));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) return;
    
    setFormData(prev => ({
      ...prev,
      detalles: (prev.detalles || []).map((detalle, i) => 
        i === index ? { ...detalle, cantidad: newQuantity } : detalle
      )
    }));
  };

  const handleEstadoPedidoChange = (value: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado') => {
    setFormData(prev => ({ ...prev, estadoPedido: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePedido({
        ...formData,
        detalles: formData.detalles || []
      });
      router.push('/order/see');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const total = (formData.detalles || []).reduce(
    (sum, detalle) => sum + detalle.cantidad * detalle.precioUnitario,
    0
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!currentPedido) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Editar Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cliente</Label>
                <p className="text-sm text-gray-500">{currentPedido.clienteNombre}</p>
              </div>
              <div>
                <Label>Empleado</Label>
                <p className="text-sm text-gray-500">{currentPedido.empleadoNombre}</p>
              </div>
              <div>
                <Label htmlFor="estadoPedido">Estado del Pedido</Label>
                <Select
                  value={formData.estadoPedido}
                  onValueChange={handleEstadoPedidoChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent defaultValue={formData.estadoPedido}>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="En Proceso">En Proceso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Agregar Plato</h3>
              <div className="flex gap-4">
                <Select
                  value={selectedPlato?.codigo || ''}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Seleccionar plato" />
                  </SelectTrigger>
                  <SelectContent>
                    {platos.map((plato) => (
                      <SelectItem key={plato.codigo} value={plato.codigo}>
                        {plato.nombre} - S/. {plato.precio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  type="button"
                  onClick={handleAddPlato}
                  disabled={!selectedPlato}
                >
                  Agregar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Detalles del Pedido</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plato</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio Unitario</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(formData.detalles || []).map((detalle, index) => {
                    //const plato = platos.find(p => p.codigo === detalle.platoId.toString());
                    return (
                      <TableRow key={index}>
                        <TableCell>{detalle.platoNombre || 'Plato no encontrado'}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(index, detalle.cantidad - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{detalle.cantidad}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(index, detalle.cantidad + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>S/. {detalle.precioUnitario.toFixed(2)}</TableCell>
                        <TableCell>S/. {(detalle.cantidad * detalle.precioUnitario).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemovePlato(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/order/see')}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Éxito!</AlertDialogTitle>
            <AlertDialogDescription>
              El pedido ha sido actualizado correctamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push('/order/see')}>
              Volver a la lista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 