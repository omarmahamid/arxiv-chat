package com.arxiv.chat.llm;

import dev.langchain4j.model.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(value = "CHAT_MODEL_TYPE", havingValue = "OLLAMA", matchIfMissing = true)
public class OllamaChat extends AbstractChat{

    public OllamaChat(@Value("${OLLAMA_MODEL_NAME}") String modelName) {
         super(OllamaChatModel
                .builder()
                .modelName(modelName)
                .logRequests(true)
                .logResponses(true)
                .build());
    }
}
