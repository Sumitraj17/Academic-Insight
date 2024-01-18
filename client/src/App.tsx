import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
// import { useAuth } from "./context/auth-context"

const App = () => {
    // const auth = useAuth();

    return (
        <div className="text-xl font-bold">App</div>
    )
}

export default App;