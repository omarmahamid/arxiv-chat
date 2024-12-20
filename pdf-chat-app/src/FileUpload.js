import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ onFileUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/arxiv/inject', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const sessionId = response.data.sessionId; // Assuming the server returns a sessionId
            onFileUpload(sessionId);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload PDF</button>
        </div>
    );
}

export default FileUpload;