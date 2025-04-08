const API_ENDPOINTS = {

  
  // Empleado endpoints
  empleados: {
    list: '/empleados',
    detail: (id: string) => `/api/empleados/${id}`,
    create: '/empleados',
    update: (id: string) => `/api/empleados/${id}`,
    delete: (id: string) => `/api/empleados/${id}`,
    search: '/empleados/search',
  },
  
  // Cliente endpoints
  clientes: {
    list: '/clientes',
    detail: (id: string) => `/api/clientes/${id}`,
    create: '/clientes',
    update: (id: string) => `/api/clientes/${id}`,
    delete: (id: string) => `/api/clientes/${id}`,
    search: '/clientes/search',
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