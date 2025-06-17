import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import Auth from './pages/home/home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth />
  </StrictMode>,
)
