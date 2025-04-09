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