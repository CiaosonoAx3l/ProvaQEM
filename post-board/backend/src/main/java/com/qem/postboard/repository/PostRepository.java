package com.qem.postboard.repository;

import com.qem.postboard.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    // Questo metodo recupera i post ordinati per data di creazione decrescente
    // e accetta un oggetto Pageable per gestire automaticamente "page" e "size" della paginazione
    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);
}