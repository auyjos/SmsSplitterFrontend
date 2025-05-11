# SMS Splitter Frontend

A modern React application built with Vite, TypeScript, and Material UI that provides a user interface for splitting long SMS messages into multiple parts while maintaining a maximum length of 160 characters per message.

## Features

- Modern React application with TypeScript support
- Material UI components for a polished user interface
- Real-time message splitting preview
- Character counter and part estimator
- Responsive design
- Error handling and loading states
- Integration with SMS Splitter backend service

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Setup and Running

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

The application will start on port 5173 by default.

## Project Structure

```
src/
  ├── components/    # Reusable UI components
  ├── services/     # API and other services
  ├── types/        # TypeScript type definitions
  └── assets/       # Static assets
```

## Architecture & Design Decisions

### 1. Technology Stack
- **Vite:** For fast development and optimal production builds
- **TypeScript:** For type safety and better developer experience
- **Material UI:** For a consistent and professional UI design
- **React:** For building dynamic user interfaces

### 2. Component Structure
- Modular components for better maintainability
- Separation of concerns between UI components and business logic
- Type-safe props and state management

### 3. State Management
- Local state management using React hooks
- Efficient state updates for real-time character counting
- Loading and error states for API interactions

### 4. API Integration
- Type-safe API calls
- Error handling and loading states
- Consistent response handling

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Future Improvements

1. Add comprehensive test coverage
2. Implement caching for API responses
3. Add offline support
4. Add user preferences (dark mode, etc.)
5. Add animations for better UX
6. Add internationalization support
7. Add PWA support
8. Implement CI/CD pipeline

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
