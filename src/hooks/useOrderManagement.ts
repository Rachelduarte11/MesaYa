import { useState, useCallback } from 'react'
import { pedidoService } from '@/services/pedido/pedidoService'
import { Pedido } from '@/services/api/types'

export function useOrderManagement() {
  const [orders, setOrders] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActiveOrders = useCallback(async () => {
    try {
      setLoading(true)
      const data = await pedidoService.getAllActive()
      setOrders(data)
    } catch (err) {
      setError('Error al cargar los pedidos')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchOrders = useCallback(async (query: string) => {
    try {
      setLoading(true)
      const data = await pedidoService.search(query)
      setOrders(data)
    } catch (err) {
      setError('Error al buscar pedidos')
      console.error('Error searching orders:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteOrder = useCallback(async (id: string) => {
    try {
      await pedidoService.delete(Number(id))
      setOrders(orders.filter(order => order.codigo !== Number(id)))
    } catch (err) {
      setError('Error al eliminar el pedido')
      console.error('Error deleting order:', err)
    }
  }, [orders])

  return {
    orders,
    loading,
    error,
    fetchActiveOrders,
    searchOrders,
    deleteOrder
  }
} 