'use client';

import { OrderManagement } from '@/components/order-management';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
        <Button 
          variant="outline"
          className="text-black border-gray-300 hover:bg-green-600 hover:text-white hover:border-green-600"
          onClick={() => router.push('/order/all')}
        >
          Ver todos los registros
        </Button>
      </div>
      <OrderManagement />
    </div>
  );
}

