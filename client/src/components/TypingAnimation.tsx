import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = () => {
    return (
        <TypeAnimation
            sequence={
                [
                    'Welcome to Academic Insight',
                    1000,
                    'Managing your students just got easier!',
                    1000,
                    'Get started now!',
                    1000
                ]}
            speed={50}
            style={{
                fontSize: '60px',
                color: 'black',
                display: 'inline-block',
            }}
            repeat={Infinity}
        >

        </TypeAnimation>
    )
}