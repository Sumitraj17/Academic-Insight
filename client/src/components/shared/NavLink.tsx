import { Link } from "react-router-dom";

interface NavLinkProps {
    to: string;
    bg: string;
    text: string | JSX.Element;
    textColor: string;
    onClick?: () => Promise<void>;
}

const NavLink = ({ to, bg, text, textColor, onClick }: NavLinkProps) => {
    return (
        <Link
            onClick={onClick}
            className="nav-link"
            to={to}
            style={{
                background: bg,
                color: textColor
            }}
        >
            {text}
        </Link >
    )
}

export default NavLink;