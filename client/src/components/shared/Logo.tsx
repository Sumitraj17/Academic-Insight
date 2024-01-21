import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: "15px"
        }}>
            <Link to={"https://www.rnsit.ac.in/"}>
                <img
                    src="rns-logo.jpeg"
                    alt="rnsit-logo"
                    width="40px"
                    height="40px"
                />
            </Link>
        </div>
    )
}

export default Logo