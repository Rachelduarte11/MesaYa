'use client';

import { OrderManagement } from '@/components/order-management';

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pedidos</h1>
      <OrderManagement />
    </div>
  );
}

