const API_ENDPOINTS = {

  
  // Empleado endpoints
  empleados: {
    list: '/api/empleados',
    detail: (id: string) => `/api/empleados/${id}`,
    create: '/api/empleados',
    update: (id: string) => `/api/empleados/${id}`,
    delete: (id: string) => `/api/empleados/${id}`,
    search: '/api/empleados/search',
  },
  
  // Cliente endpoints
  clientes: {
    list: '/api/clientes',
    detail: (id: string) => `/api/clientes/${id}`,
    create: '/api/clientes',
    update: (id: string) => `/api/clientes/${id}`,
    delete: (id: string) => `/api/clientes/${id}`,
    search: '/api/clientes/search',
  },
  
  // Plato endpoints
  platos: {
    list: '/api/platos',
    detail: (codigo: string) => `/api/platos/${codigo}`,
    create: '/api/platos',
    update: (codigo: string) => `/api/platos/${codigo}`,
    delete: (codigo: string) => `/api/platos/${codigo}`,
    search: '/api/platos/search',
  },

    // Pedido endpoints
    pedidos: {
      list: '/api/pedidos',
      detail: (id: string) => `/api/pedidos/${id}`,
      create: '/api/pedidos',
      update: (id: string) => `/api/pedidos/${id}`,
      delete: (id: string) => `/api/pedidos/${id}`,
      search: '/api/pedidos/search',
    },
  
  // Add more endpoint groups as needed
  // Example:
  // products: {
  //   list: '/products',
  //   detail: (id: string) => `/products/${id}`,
  //   create: '/products',
  //   update: (id: string) => `/products/${id}`,
  //   delete: (id: string) => `/products/${id}`,
  // },
};

export default API_ENDPOINTS; 