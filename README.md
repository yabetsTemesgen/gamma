# Gamma

A comprehensive movie streaming platform built with Next.js, featuring a modern UI, efficient performance optimizations, and comprehensive testing setup.

## Features

- Modern and responsive user interface
- Search and filtering capabilities
- Toast messages for user notifications
- Comprehensive test coverage with Cypress
- Optimized images and SVG components
- Centralized API service layer

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yabetsTemesgen/gamma.git
cd gamma
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Setup

Create a `.env` file in the root directory

Replace `your_api_base_url` with `https://gama-test-1.onrender.com` (Exposing the URL for testing purpose)

```env
NEXT_PUBLIC_API_BASE_URL=your_api_base_url
```

### Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

## Testing

### Setup Cypress

```bash
npm install cypress --save-dev
# or
yarn add cypress --dev
```

### Running Tests

```bash
# Open Cypress Test Runner
npm run cypress:open
# or
yarn cypress:open
```

## Project Structure

```
gamma/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── player/
|   |       ├── page.tsx
│   ├── components/
│   │   ├──  ...
│   │   └── icons/
│   │       └── ...
│   ├── services/
│   │   └── movieService.ts
│   ├── types/
│   │   └── ...
│   └── assets/
│       └── images/
├── cypress/
│   ├── e2e/
│   │   └── ...
│   └── support/
│       └── ...
└── public/
    └── ...
```

## Technical Implementation

### Performance Optimization

- Using Next/Image component for optimized image loading
- Custom SVG components instead of react-icons package for reduced bundle size
- Custom built Shimmer component instead of using third-party library
- Optimized fonts with next/font

### API Integration

- Centralized API service layer in `services/movieService.ts`
- Environment-based API configuration
- Proper error handling mechanisms
- Loading states management

### Additional Features

- Toast notifications using react-toastify
- Comprehensive E2E testing with Cypress

## Deployment

Deploy on Vercel:
   - Connect your repository to Vercel
   - Configure environment variables
   - Deploy with following settings:
     - Framework Preset: Next.js
     - Build Command: `next build`
     - Output Directory: `.next`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cypress Documentation](https://docs.cypress.io)
- [Vercel Deployment](https://vercel.com/docs)
