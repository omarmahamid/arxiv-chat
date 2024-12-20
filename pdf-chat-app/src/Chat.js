import React, { useState } from 'react';
import axios from 'axios';

function Chat({ sessionId }) {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleAskQuestion = async () => {
        try {
            const res = await axios.post('http://localhost:8080/arxiv/ask', {
                sessionId,
                question,
            });
            setResponse(res.data);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Ask a question about the PDF"
            />
            <button onClick={handleAskQuestion}>Ask</button>
            {response && <p>Response: {response}</p>}
        </div>
    );
}

export default Chat;