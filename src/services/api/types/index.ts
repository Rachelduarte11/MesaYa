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

// Add more types as needed for your specific API endpoints 