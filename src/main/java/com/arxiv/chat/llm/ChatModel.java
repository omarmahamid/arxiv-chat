package com.arxiv.chat.llm;


import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.store.embedding.EmbeddingStore;

public interface ChatModel {

    String chat(String question);

    void refresh(EmbeddingStore<TextSegment> embeddingStore);

}
