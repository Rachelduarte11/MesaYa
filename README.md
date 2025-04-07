# MesaYa - Sistema de Gestión para Restaurantes

![MesaYa Logo](./public/images/mesa-ya.png)

MesaYa es una aplicación web moderna para la gestión de restaurantes, desarrollada con Next.js 13+ y TypeScript. El sistema permite gestionar clientes, personal, platos y pedidos de manera eficiente.

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Inicio Rápido](#-inicio-rápido)
- [Páginas Principales](#-páginas-principales)
  - [Dashboard](#dashboard)
  - [Clientes](#clientes)
  - [Personal](#personal)
  - [Platos](#platos)
  - [Pedidos](#pedidos)
- [Componentes UI](#-componentes-ui)
- [Seguridad](#-seguridad)
- [Responsive Design](#-responsive-design)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autores](#-autores)
- [Agradecimientos](#-agradecimientos)

## 🚀 Características Principales

- **Gestión de Clientes**: Registro y seguimiento de clientes
- **Gestión de Personal**: Administración del personal del restaurante
- **Gestión de Platos**: Catálogo de platos y menú
- **Gestión de Pedidos**: Sistema completo de pedidos y seguimiento
- **Interfaz Moderna**: Diseño responsivo y amigable
- **Búsqueda en Tiempo Real**: Filtrado y búsqueda de información
- **Navegación Intuitiva**: Sistema de navegación con breadcrumbs

## 🛠️ Tecnologías Utilizadas

- **Next.js 13+**: Framework de React con App Router
- **TypeScript**: Lenguaje de programación tipado
- **Tailwind CSS**: Framework de estilos
- **Shadcn/ui**: Componentes de UI reutilizables
- **Lucide Icons**: Iconos modernos y consistentes

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Directorio principal de la aplicación
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── clients/           # Sección de clientes
│   ├── staff/             # Sección de personal
│   ├── plates/            # Sección de platos
│   └── order/             # Sección de pedidos
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI base
│   ├── header.tsx        # Encabezado de la aplicación
│   ├── sidebar-nav.tsx   # Navegación lateral
│   └── breadcrumb.tsx    # Navegación con migas de pan
└── styles/               # Estilos globales
```

## 🚀 Inicio Rápido

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd MesaYa
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir el navegador**
   ```
   http://localhost:3000
   ```

## 📱 Páginas Principales

### Dashboard
- Vista general del restaurante
- Estadísticas rápidas
- Acceso rápido a todas las secciones

### Clientes
- Lista de clientes
- Búsqueda y filtrado
- Detalles de cliente
- Historial de pedidos por cliente

### Personal
- Gestión de empleados
- Roles y permisos
- Estado de empleados
- Historial de empleados

### Platos
- Catálogo de platos
- Categorías
- Precios y disponibilidad
- Imágenes y descripciones

### Pedidos
- Creación de pedidos
- Seguimiento en tiempo real
- Historial de pedidos
- Estados de pedidos

## 🎨 Componentes UI

El proyecto utiliza una combinación de componentes personalizados y shadcn/ui para crear una interfaz consistente y moderna:

- **Cards**: Para mostrar información agrupada
- **Tables**: Para listar datos
- **Forms**: Para entrada de datos
- **Modals**: Para diálogos y confirmaciones
- **Badges**: Para estados y etiquetas

## 🔒 Seguridad

- Autenticación de usuarios
- Control de acceso basado en roles
- Protección de rutas
- Validación de datos

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:
- Dispositivos móviles
- Tablets
- Escritorio
- Pantallas grandes

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores

- Rachel Duarte - [LinkedIn](https://www.linkedin.com/in/rachel-duarte-nunez/)
- Esclender Lugo - [LinkedIn](https://www.linkedin.com/in/esclender-lugo/)
- Ivan Mera - [LinkedIn](https://www.linkedin.com/in/ivan-mera-ibarguen-a9b52a109/)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [V0 by Vercel](https://v0.dev/) 