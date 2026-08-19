package com.qem.postboard.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class PostResponse {
    private UUID id;
    private String content;
    private String authorUsername; // Mandiamo solo il nome, non tutto l'oggetto User!
    private LocalDateTime createdAt;

    // Costruttore per creare la risposta facilmente
    public PostResponse(UUID id, String content, String authorUsername, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorUsername = authorUsername;
        this.createdAt = createdAt;
    }

    // Getter
    public UUID getId() { return id; }
    public String getContent() { return content; }
    public String getAuthorUsername() { return authorUsername; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}