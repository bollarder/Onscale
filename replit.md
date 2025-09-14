# Business Dashboard Application

## Overview

This is a comprehensive business dashboard application built with a full-stack architecture. The application provides real-time business insights and analytics across multiple domains including e-commerce, advertising, cash flow, customer service, and growth metrics. It features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client-side is built using **React with TypeScript** and follows a component-based architecture:

- **UI Framework**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

The application supports both light and dark themes through a context-based theme provider. The layout uses a responsive sidebar navigation pattern that adapts to mobile devices.

### Backend Architecture

The server-side uses **Express.js** with TypeScript:

- **API Structure**: RESTful endpoints organized by business domains
- **Development Setup**: Vite middleware integration for seamless development
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging for API endpoints

### Data Storage Solutions

**Primary Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema definitions
- **Connection**: Neon Database serverless PostgreSQL
- **Fallback Storage**: In-memory storage implementation for development

The database schema includes tables for users, dashboard metrics, and chart data with proper relationships and constraints.

### Database Schema Design

Three main entities drive the application:
- **Users**: Authentication and user management
- **Dashboard Metrics**: KPI data organized by business sections
- **Chart Data**: Visualization data stored as JSONB for flexibility

Each metric is categorized by section (dashboard, ecommerce, advertising, etc.) allowing for efficient querying and organization.

### Page Structure and Routing

The application is organized into distinct business intelligence sections:
- **Dashboard Overview**: High-level business metrics
- **E-commerce Management**: Sales and order analytics
- **Advertising Performance**: Campaign ROI and metrics
- **Cash Flow Management**: Financial tracking
- **Customer Service Analytics**: Support metrics
- **Customer Analytics**: User behavior analysis
- **Growth Reports**: Business growth trends

### Component Architecture

**Reusable Components**:
- **KPICard**: Displays key performance indicators with trend indicators
- **ChartCard**: Wrapper for chart visualizations with filtering options
- **DashboardLayout**: Main layout with responsive sidebar navigation

**UI Component System**:
Built on shadcn/ui providing consistent, accessible components including forms, data display, navigation, and feedback elements.

## External Dependencies

### Core Framework Dependencies

- **React 18**: Frontend framework with modern concurrent features
- **Express.js**: Backend web application framework
- **TypeScript**: Type safety across the entire application

### Database and ORM

- **Drizzle ORM**: Type-safe database operations and schema management
- **Neon Database**: Serverless PostgreSQL hosting
- **connect-pg-simple**: PostgreSQL session store integration

### UI and Styling

- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **Lucide React**: Icon library for consistent iconography

### Data Fetching and State Management

- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema parsing

### Development and Build Tools

- **Vite**: Build tool and development server
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with autoprefixer

### Visualization and Charts

- **Chart.js**: Canvas-based charting library
- **date-fns**: Date manipulation and formatting utilities

### Authentication and Sessions

The application is structured to support session-based authentication with PostgreSQL session storage, though the current implementation focuses on the dashboard functionality.