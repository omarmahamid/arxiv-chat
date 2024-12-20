import React from 'react';
import { FileIcon, UserCircle, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className="w-8 h-8 flex-shrink-0">
        {isUser ? (
          <UserCircle className="w-full h-full text-blue-500" />
        ) : (
          <Bot className="w-full h-full text-purple-500" />
        )}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
          }`}
        >
          <p>{message.content}</p>
        </div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm"
              >
                <FileIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{file.name}</span>
                <span className="text-xs text-gray-400">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
            ))}
          </div>
        )}
        <span className="text-xs text-gray-400 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}