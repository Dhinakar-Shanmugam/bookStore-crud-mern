import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
<SnackbarProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</SnackbarProvider>
)
