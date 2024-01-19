import { Box, Typography } from "@mui/material";

const Login = () => {
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
                mr={"12"}
            >
                <form
                    onSubmit={() => { }}
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
                            padding="2"
                            fontWeight="600"
                        >
                            Login
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Login;