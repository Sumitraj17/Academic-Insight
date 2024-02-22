import { Box } from '@mui/material';
import { TypingAnimation } from '../components/TypingAnimation';

const Home = () => {
    return (
        <Box
            width='100%'
            height='100%'
        >
            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 'auto',
                mt: 3
            }}>
                <TypingAnimation />
            </Box>
            <Box sx={{
                display: 'flex',
                width: '100%',
                mx: 'auto',
                height: '100%',
            }}>
                <img
                    src="./rnsit.jpg"
                    alt=""
                    style={{
                        display: 'flex',
                        margin: 'auto',
                        width: '60%',
                        borderRadius: 20,
                        marginTop: 20,
                        marginBottom: 10,
                    }}
                />
            </Box>
        </Box>
    )
}

export default Home;