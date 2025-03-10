# AutoAct Extension Development Guide

## Build Commands
- Build: `rollup -c`
- Watch mode: `rollup -c -w`

## Linting & Formatting
- Prettier is configured with 4-space tabs, single quotes, and semicolons
- TypeScript is set to strict mode

## Code Style Guidelines
- **Naming**: Use PascalCase for components, interfaces, and types; camelCase for variables and functions
- **Imports**: Group imports by external libraries, then internal modules
- **Components**: Use functional components with React hooks
- **Types**: Prefer explicit typing over `any`; use interfaces for object shapes
- **Error Handling**: Use try/catch for async operations
- **File Structure**:
  - `/sidebar`: App sidebar components
  - `/toolbar`: Toolbar components and content scripts
  - `/background`: Background scripts for extension
  - Models should be defined in `models/*.model.ts`

## Project Structure
- React 19 with TypeScript
- TailwindCSS for styling
- Chrome extension APIs (requires @types/chrome)
- Rollup for bundling