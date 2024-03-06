import NavLink from "./shared/NavLink"
import { AppBar, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/auth-context"

const Header = () => {
    const auth = useAuth();
    return (
        <div className='header' style={{
            marginBottom: '50px'
        }}>
            <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none", backgroundColor: '#09015f' }}>
                <Toolbar sx={{ display: "flex" }}>
                    <Logo />
                    <div>
                        {auth?.isLoggedIn ? (
                            <>
                                <NavLink
                                    bg="#09015f"
                                    to="/upload"
                                    text="Upload"
                                    textColor="white"
                                />
                                <NavLink
                                    bg="#09015f"
                                    to="/view-marks"
                                    text="View Marks"
                                    textColor="white"
                                />
                                <NavLink
                                    bg="#09015f"
                                    to="/logout"
                                    text="Logout"
                                    textColor="white"
                                    onClick={() => auth?.logout(auth.type)}
                                />
                            </>
                        ) : (
                            <>
                                <NavLink
                                    bg="#09015f"
                                    to="/login"
                                    text="Login"
                                    textColor="white"
                                />
                                <NavLink
                                    bg="#09015f"
                                    to="/"
                                    text="Home"
                                    textColor="white"
                                />
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar >
        </div>
    )
}

export default Header