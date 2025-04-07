# MesaYa Frontend

A modern, scalable React frontend for the MesaYa restaurant management system.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Generic UI components (buttons, inputs, etc.)
│   ├── layout/         # Layout components (header, footer, etc.)
│   └── features/       # Feature-specific components
├── pages/              # Next.js pages/routes
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API helpers
├── styles/             # Global and component-specific styles
├── context/            # React Context providers
└── types/              # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mesaya-frontend.git
cd mesaya-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Authentication with JWT
- 🚀 Fast page loads with Next.js
- 📦 Modular component architecture
- 🎯 Type-safe with TypeScript

## Development

### Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use TypeScript for type safety
- Write meaningful component and function names
- Add comments for complex logic

### Component Structure

Components should follow this structure:

```typescript
import React from 'react';
import { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Component-specific props
}

export const Component: React.FC<Props> = ({ children, ...props }) => {
  return (
    // Component JSX
  );
};
```

### State Management

- Use React Context for global state
- Use local state for component-specific state
- Use custom hooks for reusable state logic

## Building for Production

```bash
npm run build
# or
yarn build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 