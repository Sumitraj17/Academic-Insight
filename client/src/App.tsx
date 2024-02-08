import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import { useAuth } from "./context/auth-context"
import Marks from "./pages/Marks"
import Logout from "./pages/Logout"

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
                {auth?.isLoggedIn}(
                    <Route path="/logout" element={<Logout/>}/>
                )
            </Routes>
        </main>
    )
}

export default App;