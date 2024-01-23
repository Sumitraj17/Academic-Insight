import { Box, Typography, Button } from "@mui/material";
import CustomInput from "../components/shared/CustomInput";
import { IoLogIn } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth-context";

const Signup = () => {
    const auth = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const id = formData.get("id") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        try {
            toast.loading("Signing up!", { id: "signup" })
            await auth?.signup(id, name, email, password, phoneNumber);
            toast.success("Signed in", { id: "signup" });
        } catch (error) {
            toast.error("Sign up failed", { id: "signup" });
        }
    }

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
                            SignUp
                            <CustomInput name="id" label="Id" type="text" />
                            <CustomInput name="name" label="Name" type="text" />
                            <CustomInput name="email" label="Email" type="email" />
                            <CustomInput name="password" label="Password" type="password" />
                            <CustomInput name="phoneNumber" label="Phone Number" type="text" />
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
                                SignUp
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Signup