package com.arxiv.chat;


import com.arxiv.chat.exception.InjectDocumentException;
import com.arxiv.chat.llm.ChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/arxiv")
public class ArxivChatController {

    private final ChatModel chatModel;
    private final ArxivEmbeddingService arxivEmbeddingService;

    @Autowired
    public ArxivChatController(ChatModel chatModel, ArxivEmbeddingService arxivEmbeddingService) {
        this.chatModel = chatModel;
        this.arxivEmbeddingService = arxivEmbeddingService;
    }


    @PostMapping("/inject")
    public ResponseEntity<String> injectFile(@RequestParam("file") MultipartFile file) {
        try {
            arxivEmbeddingService.inject(file);
            return ResponseEntity.ok(String.format("document %s injected successfully", file.getName()));
        }catch (Exception e) {
            throw new InjectDocumentException(e.getMessage());
        }
    }

    @PostMapping("/question")
    public ResponseEntity<String> question(@RequestBody String question) {
        return ResponseEntity.ok(chatModel.chat(question));
    }
}
