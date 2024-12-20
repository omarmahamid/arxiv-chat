import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { FileUpload } from './components/FileUpload';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const handleSend = async () => {
    if (!input.trim() && pendingFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
      attachments: pendingFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }))
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setPendingFiles([]);

    try {
      const response = await fetch('http://localhost:8080/arxiv/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ question: input.trim() })
      });

      if (response.ok) {
        const responseData = await response.text();
        const assistantMessage: Message = {
          id: Date.now().toString(),
          type: 'assistant',
          content: responseData || 'Server response received.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Error: ${error}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 container mx-auto max-w-4xl p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-4 mb-4">
            <FileUpload
              onFileSelect={(files) => {
                setPendingFiles(Array.from(files));
              }}
            />
            {pendingFiles.length > 0 && (
              <div className="text-sm text-gray-500">
                {pendingFiles.length} file(s) selected
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;