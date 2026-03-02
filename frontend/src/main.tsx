import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🟢 main.tsx: Starting React app...')
const root = document.getElementById('root')
console.log('🟢 main.tsx: Root element:', root)

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

console.log('🟢 main.tsx: React app mounted')
