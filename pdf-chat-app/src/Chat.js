import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css'; // Import the CSS file for styling

function Chat() {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chat window visibility

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = async () => {
        try {
            const res = await axios.post('http://localhost:8080/arxiv/ask', {
                question,
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div>
            <IconButton className="floating-chat-button" onClick={toggleChat}>
                <FontAwesomeIcon icon={faCommentDots} />
            </IconButton>
            {isChatOpen && (
                <Card className="chat-window">
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                            <Typography variant="h5" gutterBottom>Chat</Typography>
                            <TextField
                                label="Ask a question about the PDF"
                                variant="outlined"
                                value={question}
                                onChange={handleQuestionChange}
                                style={{ marginBottom: '10px', width: '300px' }}
                            />
                            <Button variant="contained" color="primary" onClick={handleAskQuestion}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                            {response && <Typography variant="body1" mt={2}>Response: {response}</Typography>}
                        </Box>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Chat;