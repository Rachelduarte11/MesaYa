import { useState, useEffect } from 'react'
import { clienteService } from '@/services/clientes/clienteService'
import { empleadoService } from '@/services/empleados/empleadoService'
import { platoService } from '@/services/platos/platoService'
import { Cliente, Empleado, Plato } from '@/services/api/types'

export function useOrderData() {
  const [clients, setClients] = useState<Cliente[]>([])
  const [employees, setEmployees] = useState<Empleado[]>([])
  const [platos, setPlatos] = useState<Plato[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [clientsData, employeesData, platosData] = await Promise.all([
          clienteService.getAllActive(),
          empleadoService.getAllActive(),
          platoService.getAllActive()
        ])
        setClients(clientsData)
        setEmployees(employeesData)
        setPlatos(platosData)
      } catch (err) {
        console.error('Error fetching order data:', err)
        setError('Error loading data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    clients,
    employees,
    platos,
    loading,
    error
  }
} 