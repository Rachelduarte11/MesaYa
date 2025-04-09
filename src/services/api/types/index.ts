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
    id: string;
    email: string;
    name: string;
  };
}

// User types
export interface UserProfile {
  id: string;
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

// Empleado (Employee) types
export interface Empleado {
  codigo: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: boolean;
}

export interface CreateEmpleadoRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  documento: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: boolean;
}

export interface UpdateEmpleadoRequest extends Partial<CreateEmpleadoRequest> {
  codigo: number;
}

// Cliente (Customer) types
export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: string;
  estado: 'activo' | 'inactivo';
}

export interface CreateClienteRequest {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface UpdateClienteRequest extends Partial<CreateClienteRequest> {
  id: string;
}

// Pedido (Order) types
export interface Pedido {
  codigo: number;
  estado: number;
  nombre: string;
  fecha: string;
  estado_pedido: string;
  total: number;
  cliente_id: number;
  empleado_id: number;
  cliente?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  empleado?: {
    codigo: number;
    nombre: string;
    apellidoPaterno: string;
  };
}

export interface CreatePedidoRequest {
  estado: number;
  nombre: string;
  fecha: string;
  estado_pedido: string;
  total: number;
  cliente_id: number;
  empleado_id: number;
}

export interface UpdatePedidoRequest {
  codigo: number;
  estado?: number;
  nombre?: string;
  fecha?: string;
  estado_pedido?: string;
  total?: number;
  cliente_id?: number;
  empleado_id?: number;
}

// Add more types as needed for your specific API endpoints 