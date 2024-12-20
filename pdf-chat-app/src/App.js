import React from 'react';
import FileUpload from './FileUpload';
import Chat from './Chat';
import './App.css';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container className="App" maxWidth="sm">
      <Typography variant="h3" gutterBottom>PDF Chat Application</Typography>
      <FileUpload />
      <Chat />
    </Container>
  );
}

export default App;