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
                                to="/upload"
                                text="Upload"
                                textColor="black"
                            />
                            <NavLink
                                bg="#ffff"
                                to="/view-marks"
                                text="View Marks"
                                textColor="black"
                            />
                            <NavLink
                                bg="#ffff"
                                to="/logout"
                                text="Logout"
                                textColor="black"
                                onClick={auth?.logout}
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
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar >
    )
}

export default Header