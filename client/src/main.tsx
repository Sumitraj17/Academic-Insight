import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import { AuthProvider } from './context/auth-context.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'

//default axios settings
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

//theme for the whole website
// const theme = createTheme({
//     typography: {
//         fontFamily: "Roboto Slab, serif",
//         allVariants: { color: "#000" }
//     }
// })

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    {/* <ThemeProvider theme={theme}> */}
                    <Toaster position='top-right' />
                    <App />
                    {/* </ThemeProvider> */}
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
