# Chat with Arxiv Papers

![Chat with Arxiv Papers]

## 1. Select Arxiv paper.

![alt text](image.png)

## 2. Start chat
![img.png](img.png)


This project allows users to chat with an LLM (Large Language Model) about arxiv papers. The application provides a user-friendly interface to ask questions and receive responses from the LLM.

## Application Brief

The application enables users to upload arxiv papers and ask questions about them. The LLM processes the documents and provides relevant answers based on the content of the uploaded papers.

## Features

- **Upload Documents**: Easily upload arxiv papers for analysis.
- **Interactive Chat**: Ask questions and receive answers in real-time.
- **File Attachments**: Attach files to your messages.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## How to Use It

1. **Upload a Document**: Use the file upload feature to upload an arxiv paper.
2. **Ask a Question**: Type your question in the input field and press Enter or click the send button.
3. **Receive Response**: The LLM will process your question and provide a response based on the content of the uploaded document.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Spring Boot, Java
- **LLM Integration**: LangChain4j

## Prerequisites

- **Ollama**: Install Ollama locally. OR Obtain an Azure OpenAI license
- **Java 21**: Ensure you have Java 21 installed.

## LLM Options

The application supports multiple LLM options:
- **Azure OpenAI**: Configured via `AzureOpenAIChat` class.
- **Ollama**: Configured via `OllamaChat` class.

## How to Build It

To build and run the project, use the following command:

```sh
mvn spring-boot:run