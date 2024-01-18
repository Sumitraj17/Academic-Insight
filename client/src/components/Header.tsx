import NavLink from "./shared/NavLink"
import { AppBar, Toolbar } from "@mui/material"

const Header = () => {
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static" }}>
            <Toolbar sx={{ display: "flex" }}>
                <div>
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
                </div>
            </Toolbar>
        </AppBar >
    )
}

export default Header