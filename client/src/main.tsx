import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import './index.css'

//default axios settings
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

//theme for the whole website
const theme = createTheme({
    typography: {
        fontFamily: "Roboto Slab, serif",
        allVariants: { color: "#000" }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Toaster position='top-right' />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
