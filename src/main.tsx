import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Router } from './app/Router.tsx'
import './styles/index.css'
import { ThemeProvider } from './app/providers/ThemeProvider.tsx'
import { AuthProvider } from './app/providers/AuthProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={Router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
)
