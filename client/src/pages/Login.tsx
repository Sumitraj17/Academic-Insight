import { Box, Typography, Button, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material";
import { IoLogIn } from "react-icons/io5";
import CustomInput from "../components/shared/CustomInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [type, setType] = useState<"admin" | "teacher" | "student">("admin")

    const handleChange = (event: SelectChangeEvent) => {
        event.preventDefault();
        setType(event.target.value as "admin" | "teacher" | "student");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            toast.loading("Logging In", { id: "login" });
            await auth?.login(type,email, password); // add user after changing db
            toast.success("Logged In Successfully!", { id: "login" });
        } catch (error) {
            toast.error("Login In Failed", { id: "login" });
        }
    }

    useEffect(() => {
        if (auth?.user)
            return navigate("/view-marks");
    }, [auth]);

    return (
        <Box width="100%" height="100%" display="flex" flex="1">
            <Box
                padding={6}
                mt={2}
                display={{
                    md: "flex",
                    sm: "none",
                    xs: "none"
                }}
            >
                <img src="" alt="" />
            </Box>
            <Box
                display={'flex'}
                flex={{
                    xs: "1",
                    md: "0.5"
                }}
                justifyContent={'center'}
                alignItems={'center'}
                padding={1}
                ml={'auto'}
                mr={12}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        margin: "auto",
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        border: "none"
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography
                            variant="h4"
                            textAlign="center"
                            padding={2}
                            fontWeight={600}
                        >
                            Login
                            <InputLabel id='user-type'>Type</InputLabel>
                            <Select
                                id="user-type-select"
                                labelId="user-type"
                                label="Type"
                                value={type}
                                onChange={handleChange}
                                sx={{
                                    width: "25rem",
                                    borderRadius: "10",
                                    fontSize: 20,
                                    color: "black"
                                }}
                            >
                                <MenuItem value='admin'>Admin</MenuItem>
                                <MenuItem value='teacher'>Teacher</MenuItem>
                                <MenuItem value='student'>Student</MenuItem>
                            </Select>
                            <CustomInput name="email" label="Email" type="email" />
                            <CustomInput name="password" label="Password" type="password" />
                            <Button
                                type="submit"
                                sx={{
                                    px: 2,
                                    py: 1,
                                    mt: 2,
                                    width: "400px",
                                    borderRadius: 2,
                                    bgcolor: "white",
                                    "hover": {
                                        bgcolor: "black",
                                        color: "white"
                                    }
                                }}
                                endIcon={<IoLogIn />}
                            >
                                Login
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Login;