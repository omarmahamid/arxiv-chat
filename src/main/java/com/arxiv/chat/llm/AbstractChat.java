package com.arxiv.chat.llm;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.embedding.EmbeddingStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractChat implements ChatModel{

    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractChat.class);

    protected Assistant assistant;
    protected ChatLanguageModel chatLanguageModel;

    protected AbstractChat(ChatLanguageModel chatLanguageModel) {
        this.chatLanguageModel = chatLanguageModel;
    }

    @Override
    public String chat(String question) {
        LOGGER.info("Handling question: {}", question);
        if (assistant == null) {
            LOGGER.warn("Assistant is not initialized!, please select pdf to analyze.");
            return null;
        }
        return assistant.chat(question);
    }


    @Override
    public synchronized void refresh(EmbeddingStore<TextSegment> embeddingStore) {
        this.assistant = AiServices.builder(Assistant.class)
                .chatMemory(MessageWindowChatMemory.withMaxMessages(10))
                .chatLanguageModel(chatLanguageModel)
                .contentRetriever(EmbeddingStoreContentRetriever.from(embeddingStore))
                .build();
    }
}
