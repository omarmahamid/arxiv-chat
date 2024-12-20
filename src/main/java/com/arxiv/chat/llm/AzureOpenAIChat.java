package com.arxiv.chat.llm;


import dev.langchain4j.model.azure.AzureOpenAiChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(value = "CHAT_MODEL_TYPE", havingValue = "AZURE_OPEN_AI")
public class AzureOpenAIChat extends AbstractChat {

    public AzureOpenAIChat(@Value("${AZURE_OPEN_AI_KEY:#{null}}") String apiKey,
                           @Value("${AZURE_OPEN_AI_DEPLOYMENT_NAME:#{null}}") String deploymentName,
                           @Value("${AZURE_OPEN_AI_ENDPOINT:#{null}}") String endpoint) {
        super(AzureOpenAiChatModel
                .builder()
                .apiKey(apiKey != null ? apiKey : System.getenv("AZURE_OPEN_AI_KEY"))
                .deploymentName(deploymentName != null ? deploymentName : System.getenv("AZURE_OPEN_AI_DEPLOYMENT_NAME"))
                .endpoint(endpoint != null ? endpoint : System.getenv("AZURE_OPEN_AI_ENDPOINT"))
                .build());
    }
}
