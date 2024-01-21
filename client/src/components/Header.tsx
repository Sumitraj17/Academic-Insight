import NavLink from "./shared/NavLink"
import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/auth-context"

const Header = () => {
    const auth = useAuth();

    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavLink
                                bg="#ffff"
                                to="/marks"
                                text="Marks"
                                textColor="black"
                            />
                            <NavLink
                                bg="#ffff"
                                to="/logout"
                                text="Logout"
                                textColor="black"
                            />
                        </>
                    ) : (
                        <>
                            <NavLink
                                bg="#ffff"
                                to="/login"
                                text="Login"
                                textColor="black"
                            />
                            <NavLink
                                bg="#ffff"
                                to="/signup"
                                text="Signup"
                                textColor="black"
                            />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar >
    )
}

export default Header