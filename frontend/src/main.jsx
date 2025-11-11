import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import Navbar from "./components/navbar";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <Navbar />
      <App />
    </LanguageProvider>
  </StrictMode>,
)
