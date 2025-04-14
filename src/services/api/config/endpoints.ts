const API_ENDPOINTS = {

  
  // Empleado endpoints
  empleados: {
    list: '/api/empleados',
    listActive: '/api/empleados/active',
    detail: (id: string) => `/api/empleados/${id}`,
    create: '/api/empleados',
    update: (id: string) => `/api/empleados/${id}`,
    delete: (id: string) => `/api/empleados/${id}`,
    search: '/api/empleados/search',
  },
  
  // Cliente endpoints
  clientes: {
    list: '/api/clientes',
    listActive: '/api/clientes/active',
    detail: (id: string) => `/api/clientes/${id}`,
    create: '/api/clientes',
    update: (id: string) => `/api/clientes/${id}`,
    delete: (id: string) => `/api/clientes/${id}`,
    search: '/api/clientes/search',
  },
  
  // Plato endpoints
  platos: {
    list: '/api/platos',
    listActive: '/api/platos/active',
    detail: (codigo: string) => `/api/platos/${codigo}`,
    create: '/api/platos',
    update: (codigo: string) => `/api/platos/${codigo}`,
    delete: (codigo: string) => `/api/platos/${codigo}`,
    search: '/api/platos/search',
  },

    // Pedido endpoints
    pedidos: {
      list: '/api/pedidos',
      listActive: '/api/pedidos/active',
      detail: (id: string) => `/api/pedidos/${id}`,
      create: '/api/pedidos',
      update: (id: string) => `/api/pedidos/${id}`,
      delete: (id: string) => `/api/pedidos/${id}`,
      search: '/api/pedidos/search',
    },
  
  // Rol endpoints
  roles: {
    list: '/api/roles',
    listActive: '/api/roles/active',
    detail: (id: string) => `/api/roles/${id}`,
    create: '/api/roles',
    update: (id: string) => `/api/roles/${id}`,
    delete: (id: string) => `/api/roles/${id}`,
    search: '/api/roles/search',
  },

  // TipoDocumento endpoints
  tipoDocumentos: {
    list: '/api/tipos-documento',
    listActive: '/api/tipos-documento/active',
    detail: (id: string) => `/api/tipos-documento/${id}`,
    create: '/api/tipos-documento',
    update: (id: string) => `/api/tipos-documento/${id}`,
    delete: (id: string) => `/api/tipos-documento/${id}`,
    search: '/api/tipos-documentos/search',
  },

  // TipoPlato endpoints
  tipoPlatos: {
    list: '/api/tipos-plato',
    listActive: '/api/tipos-plato/active',
    detail: (id: string) => `/api/tipos-plato/${id}`,
    create: '/api/tipos-plato',
    update: (id: string) => `/api/tipos-plato/${id}`,
    delete: (id: string) => `/api/tipos-plato/${id}`,
    search: '/api/tipos-platos/search',
  },

  // Distrito endpoints
  distritos: {
    list: '/api/distritos',
    listActive: '/api/distritos/active',
    detail: (id: string) => `/api/distritos/${id}`,
    create: '/api/distritos',
    update: (id: string) => `/api/distritos/${id}`,
    delete: (id: string) => `/api/distritos/${id}`,
    search: '/api/distritos/search',
  },

  // Sexo endpoints
  sexos: {
    list: '/api/sexos',
    listActive: '/api/sexos/active',
    detail: (codigo: number) => `/api/sexos/${codigo}`,
  },
};

export default API_ENDPOINTS; 