import { Routes, Route } from "react-router-dom"
import { useAuth } from "./context/auth-context"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Marks from "./pages/Marks"
import Upload from "./pages/Upload";

const App = () => {
    const auth = useAuth();

    return (
        <main>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {auth?.isLoggedIn && auth?.user && (
                    <Route path="/upload" element={<Upload />} />
                )}
                {auth?.isLoggedIn && auth?.user && (
                    <Route path="/view-marks" element={<Marks />} />
                )}
            </Routes>
        </main>
    )
}

export default App;