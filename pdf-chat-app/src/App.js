import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Chat from './Chat';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState(null);

  const handleFileUpload = (sessionId) => {
    setSessionId(sessionId);
  };

  return (
      <div className="App">
        <h1>PDF Chat Application</h1>
        <FileUpload onFileUpload={handleFileUpload} />
        {sessionId && <Chat sessionId={sessionId} />}
      </div>
  );
}

export default App;