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
}

export interface Sexo {
  codigo: number;
}

export interface Distrito {
  codigo: number;
}

export interface Rol {
  codigo: number;
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
  estado: boolean;
  sueldo: number;
  tipoDocumento: TipoDocumento;
  rol: Rol;
  distrito: Distrito;
}

export interface CreateEmpleadoRequest {
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
  tipoDocumento: TipoDocumento;
  rol: Rol;
  distrito: Distrito;
}

export interface UpdateEmpleadoRequest extends Partial<CreateEmpleadoRequest> {
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
  costo: number;
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
  costo: number;
  estado: boolean;
  tipoPlato: {
    codigo: number;
  };
}

export interface UpdatePlatoRequest {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  costo?: number;
  estado?: boolean;
  tipoPlato?: {
    codigo: number;
  };
}

// Add more types as needed for your specific API endpoints 