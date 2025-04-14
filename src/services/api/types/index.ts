// Common API response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    codigo: string;
    email: string;
    name: string;
  };
}

// User types
export interface UserProfile {
  codigo: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Common types for nested objects
export interface TipoDocumento {
  codigo: number;
  nombre: string;
  estado: boolean;
}

export interface Sexo {
  codigo: number;
}

export interface Distrito {
  codigo: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface Rol {
  codigo: number;
  nombre: string;
  estado: boolean;
}

// Empleado (Employee) types
export interface Empleado {
  codigo: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  estado: boolean;
  sueldo: number;
  tipoDocumento: TipoDocumento;
  rol: Rol;
  distrito: Distrito;
}

export interface NewEmpleadoRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  estado: boolean;
  sueldo: number;
  tipoDocumentoId: number;
  rolId: number;
  distritoId: number;
  fechaIngreso: string;
}

export interface UpdateEmpleadoRequest extends Partial<NewEmpleadoRequest> {
  codigo: string;
}

// Cliente (Customer) types
export interface Cliente {
  codigo: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  estado: boolean;
  tipoDocumento: TipoDocumento;
  sexo: Sexo;
  distrito: Distrito;
}

export interface CreateClienteRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaNacimiento: string;
  estado: boolean;
  tipoDocumento: TipoDocumento;
  sexo: Sexo;
  distrito: Distrito;
}

export interface UpdateClienteRequest extends Partial<CreateClienteRequest> {
  codigo: string;
}

// Plato (Dish) types
export interface Plato {
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  tipoPlato: {
    codigo: number;
    nombre: string;
  };
}

export interface CreatePlatoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
  tipoPlato: {
    codigo: number;
  };
}

export interface UpdatePlatoRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  estado?: boolean;
  tipoPlato?: {
    codigo: number;
  };
}

// Pedido (Order) types
export interface DetallePedido {
  codigo: number;
  nombre: string;
  estado: boolean;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  platoId: number;
  platoNombre: string;
}

export interface Pedido {
  codigo: number;
  nombre: string;
  estado: boolean;
  estadoPedido: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  clienteId: number;
  clienteNombre: string;
  empleadoId: number;
  empleadoNombre: string;
  detalles: DetallePedido[];
  fecha: string;
  total: number;
}

export interface CreatePedidoRequest {
  nombre: string;
  estado: boolean;
  estadoPedido: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  clienteId: number;
  empleadoId: number;
  detalles: DetallePedido[];
}

export interface UpdatePedidoRequest {
  codigo: number;
  nombre?: string;
  estado?: boolean;
  estadoPedido?: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  clienteId?: number;
  empleadoId?: number;
  detalles?: Array<{
    cantidad: number;
    precioUnitario: number;
    platoId: number;
  }>;
}

// Rol types
export interface CreateRolRequest {
  nombre: string;
  estado: boolean;
}

export interface UpdateRolRequest {
  nombre?: string;
  estado?: boolean;
}

// TipoDocumento types
export interface CreateTipoDocumentoRequest {
  nombre: string;
  estado: boolean;
}

export interface UpdateTipoDocumentoRequest {
  nombre?: string;
  estado?: boolean;
}

// TipoPlato types
export interface TipoPlato {
  codigo: number;
  nombre: string;
  estado: boolean;
}

export interface CreateTipoPlatoRequest {
  nombre: string;
  estado: boolean;
}

export interface UpdateTipoPlatoRequest {
  nombre?: string;
  estado?: boolean;
}

// Distrito types
export interface CreateDistritoRequest {
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface UpdateDistritoRequest {
  nombre?: string;
  descripcion: string;
  estado?: boolean;
}

// Add more types as needed for your specific API endpoints 