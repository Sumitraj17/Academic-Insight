import NavLink from "./shared/NavLink"
import { AppBar, Toolbar } from "@mui/material"
import rnsLogo from "../assets/rns-logo.jpeg";

const Header = () => {
    return (
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <div>
                    <img src={rnsLogo} alt="College Logo" height="50px" width="50px"></img>
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
                </div>
            </Toolbar>
        </AppBar >
    )
}

export default Header