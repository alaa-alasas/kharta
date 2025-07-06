import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers/Routers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routers}  />
  </StrictMode>,
)
