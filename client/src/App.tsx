import { Routes, Route } from "react-router-dom"
import { useAuth } from "./context/auth-context"

import Header from "./components/Header"

import Marks from "./pages/Marks"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

const App = () => {
    const auth = useAuth();

    return (
        <main>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {auth?.isLoggedIn && auth?.user && (
                    <Route path="/marks" element={<Marks />} />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App;