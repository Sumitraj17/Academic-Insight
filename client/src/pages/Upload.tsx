import { useState, ChangeEvent, FormEvent } from "react";
import {
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Input,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import toast from "react-hot-toast";
import { fileUpload } from "../helpers/api-communicator";
import { IoCloudUpload } from "react-icons/io5";
import { useAuth } from "../context/auth-context";

const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [fileType, setFileType] = useState<"teacher" | "student" | "course" | "marks" | "teachercourse" | "semsec">('teacher');
    const auth = useAuth();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile?.name || '');
    }

    const handleTypeChange = (event: SelectChangeEvent<"teacher" | "student" | "course" | "marks" | "teachercourse" | "semsec">) => {
        setFileType(event.target.value as "teacher" | "student" | "course" | "marks" | "teachercourse" | "semsec");
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!file) {
                toast.error("No file selected", { id: 'upload-file' });
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('filetype', fileType);

            await fileUpload(formData, auth?.type);

            toast.success('File upload success', { id: 'upload-file' })
            setFile(null);
            setFileName('');
            setFileType('teacher'); // Reset type to 'teacher' after successful upload
        } catch (error) {
            console.error("File upload failed:", error);
            toast.error("File upload failed. Please try again later.", { id: 'upload-file' });
        }
    }

    return (
        <Container maxWidth='sm' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8rem',
            borderRadius: '10px'
        }}>
            <Card style={{
                width: '50rem',
            }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Upload File
                    </Typography>
                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {auth?.type === 'admin' && (
                            <Select
                                // label='FileType'
                                value={fileType}
                                onChange={handleTypeChange}
                                style={{
                                    marginBottom: '10px',
                                    width: '15rem',
                                    alignSelf: 'center',
                                    color: 'black'
                                }}
                            >
                                <MenuItem value="teacher">Teacher Data</MenuItem>
                                <MenuItem value="student">Student Data</MenuItem>
                                <MenuItem value="course">Course Data</MenuItem>
                                <MenuItem value="semsec">Semester and section</MenuItem>
                                <MenuItem value="teachercourse">Course allocation</MenuItem>
                                <MenuItem value="marks">Marks Data</MenuItem>
                            </Select>
                        )}

                        <Input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="fileInput"
                        />

                        <label htmlFor="fileInput">
                            <Button
                                variant="outlined"
                                component="span"
                                style={{ marginTop: '10px' }}
                            >
                                Choose File
                            </Button>
                        </label>

                        <Typography
                            variant="subtitle1"
                            align="center"
                            style={{ marginTop: '10px' }}
                        >
                            {fileName}
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{
                                marginTop: '20px',
                                width: '15rem',
                                alignSelf: 'center'
                            }}
                            startIcon={<IoCloudUpload />}
                        >
                            Upload File
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container >
    );
};

export default Upload;
