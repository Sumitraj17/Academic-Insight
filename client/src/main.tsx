import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material';
// import { AuthProvider } from "./context/auth-context.ts";

const theme = createTheme({
    typography: {
        fontFamily: "Roboto Slab, serif",
        allVariants: { color: "white" }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/* <AuthProvider> */}
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Toaster position='top-right' />
                <App />
            </ThemeProvider>
        </BrowserRouter>
        {/* </AuthProvider> */}
    </React.StrictMode>,
)
