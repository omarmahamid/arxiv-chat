package com.arxiv.chat;


import com.arxiv.chat.llm.ChatModel;
import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.onnx.bgesmallenv15q.BgeSmallEnV15QuantizedEmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ArxivEmbeddingService {

    private final EmbeddingStore<TextSegment> embeddingStore;
    private final EmbeddingStoreIngestor ingestor;
    private final ApachePdfBoxDocumentParser parser;
    private final ChatModel chatModel;

    @Autowired
    public ArxivEmbeddingService(ChatModel chatModel) {
        this.embeddingStore = new InMemoryEmbeddingStore<>();
        this.ingestor = EmbeddingStoreIngestor.builder()
                .embeddingStore(embeddingStore)
                .embeddingModel(new BgeSmallEnV15QuantizedEmbeddingModel())
                .build();
        this.parser = new ApachePdfBoxDocumentParser();
        this.chatModel = chatModel;
    }

    public void inject(List<MultipartFile> files) {
        List<Document> documents = files.stream().map(file -> {
            try {
                return parser.parse(file.getInputStream());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toUnmodifiableList());

        ingestor.ingest(documents);
        chatModel.refresh(embeddingStore);
    }

    public void inject(MultipartFile file) {
        inject(List.of(file));
    }


    public EmbeddingStore<TextSegment> getEmbeddingStore() {
        return embeddingStore;
    }
}
