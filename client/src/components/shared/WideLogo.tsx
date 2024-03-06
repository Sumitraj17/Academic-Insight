import { Link } from "react-router-dom"

const WideLogo = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: '1.5rem'
        }}>
            <Link
                to={"https://www.rnsit.ac.in/cse/"}
            >
                <img
                    src="rns-wide.jpeg"
                    alt="rnsit-logo"
                    width="200px"
                    height="80px"
                />
            </Link>
        </div >
    )
}

export default WideLogo