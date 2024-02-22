import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: "15px"
        }}>
            <Link
                to={"https://www.rnsit.ac.in/"}
            >
                <img
                    src="rns-logo.jpeg"
                    alt="rnsit-logo"
                    width="60px"
                    height="60px"
                />
            </Link>
            <Typography variant='h6'>RNS Institute of Technology</Typography>
        </div >
    )
}

export default Logo