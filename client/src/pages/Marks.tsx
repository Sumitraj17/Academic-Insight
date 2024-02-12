import { useState, ChangeEvent, FormEvent } from "react";
import {
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Input,
} from '@mui/material';
// import { IoCloudUpload } from 'react-icons/io5';
import toast from "react-hot-toast";
import { fileUploadTeacher } from "../helpers/api-communicator";
import { IoCloudUpload } from "react-icons/io5";

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile?.name || '');
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!file) {
                toast.error("No file selected", { id: 'upload-teacher' });
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            await fileUploadTeacher(formData);
            toast.success('File upload success', { id: 'upload-teacher' })
            setFile(null);
            setFileName('');
        } catch (error) {
            toast.error("File upload failed", { id: 'upload-teacher' });
        }
    }
    return (
        <Container maxWidth='sm' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Card style={{
                width: '50rem',
            }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Upload students file
                    </Typography>

                    <form onSubmit={handleSubmit}>
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
                            style={{ marginTop: '20px' }}
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

export default FileUpload;
