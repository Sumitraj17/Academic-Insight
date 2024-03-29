import { TextField } from "@mui/material";

interface CustomInputProps {
    name: string;
    type: string;
    label: string;
}

const CustomInput = ({ name, type, label }: CustomInputProps) => {
    return (
        <TextField
            id={name}
            margin="normal"
            InputLabelProps={{ style: { color: "black" } }}
            InputProps={{ style: { width: "25rem", borderRadius: "10", fontSize: 20, color: "black" } }}
            name={name}
            label={label}
            type={type}
        />
    )
}

export default CustomInput;