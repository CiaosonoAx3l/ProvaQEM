package com.qem.postboard.repository;

import com.qem.postboard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Spring Data JPA scriverà automaticamente la query SQL per questi metodi!
    // Ci serviranno per verificare le credenziali al momento del login.
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}