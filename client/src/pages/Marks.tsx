import { InputLabel } from "@mui/material"

const Marks = () => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        
    }
    return (
        <div>
           <form onSubmit={handleSubmit}>
                <InputLabel id='file_name'>File</InputLabel>
                <input type="file" name="file" id='file' />
           </form>
        </div>
    )
}

export default Marks