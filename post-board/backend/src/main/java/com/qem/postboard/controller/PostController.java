package com.qem.postboard.controller;

import com.qem.postboard.dto.PostCreateRequest;
import com.qem.postboard.dto.PostResponse;
import com.qem.postboard.entity.Post;
import com.qem.postboard.entity.User;
import com.qem.postboard.repository.PostRepository;
import com.qem.postboard.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // Endpoint per leggere i post (con paginazione)
    @GetMapping
    public ResponseEntity<Page<PostResponse>> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        // Chiediamo al repository i post, ordinati dal più recente
        Page<Post> postsPage = postRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(page, size));

        // Trasformiamo le Entità Post in PostResponse (più sicure e pulite per il frontend)
        Page<PostResponse> responsePage = postsPage.map(post -> new PostResponse(
                post.getId(),
                post.getContent(),
                post.getAuthor().getUsername(),
                post.getCreatedAt()
        ));

        return ResponseEntity.ok(responsePage);
    }

    // Endpoint per creare un nuovo post
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostCreateRequest request, Authentication authentication) {

        // 1. Validazione del limite di caratteri (doppio controllo lato backend!)
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Il post non può essere vuoto");
        }
        if (request.getContent().length() > 280) {
            return ResponseEntity.badRequest().body("Il post supera il limite di 280 caratteri");
        }

        // 2. Recupero dell'utente attualmente loggato (Spring Security ci fornisce l'oggetto Authentication)
        String currentUsername = authentication.getName();
        User author = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        // 3. Creazione e salvataggio del Post
        Post newPost = new Post();
        newPost.setContent(request.getContent());
        newPost.setAuthor(author); // Associamo il post all'utente

        postRepository.save(newPost);

        return ResponseEntity.status(HttpStatus.CREATED).body("Post pubblicato con successo");
    }
}