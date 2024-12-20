import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import './FileUpload.css'; // Import the CSS file for styling

function FileUpload({ onFileUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            console.log("should provide file");
            return;
        }

        const formData = new FormData();
        formData.append('file', file, file.name);

        try {
            const response = await axios.post('http://localhost:8080/arxiv/inject', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const sessionId = response.data.sessionId;
            onFileUpload(sessionId);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Box className="file-upload-container">
            <input
                type="file"
                onChange={handleFileChange}
                style={{ marginBottom: '100px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFileUpload}
                className="file-upload-button"
            >
                Upload PDF
            </Button>
        </Box>
    );
}

export default FileUpload;