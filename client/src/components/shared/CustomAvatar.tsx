import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
// import { useAuth } from "../../context/auth-context";

export const CustomAvatar = () => {

    return (
        <Avatar
            sx={{
                bgcolor: deepOrange[500],
                position: "absolute",
                left: "10%",
                top: "20%"
            }}
        >U</Avatar>
    )
}