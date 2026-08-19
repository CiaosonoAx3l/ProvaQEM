package com.qem.postboard.controller;

import com.qem.postboard.dto.LoginRequest;
import com.qem.postboard.dto.RegisterRequest;
import com.qem.postboard.entity.User;
import com.qem.postboard.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Costruttore con Dependency Injection
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Endpoint di Registrazione (Pubblico)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Controllo se l'utente esiste già
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username già in uso");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email già in uso");
        }

        // Creazione nuovo utente e hashing della password
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        // Salviamo la password solo dopo aver applicato l'hashing, come richiesto!
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED).body("Utente registrato con successo");
    }

    // Endpoint di Login (Pubblico)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {
            // Tenta l'autenticazione tramite Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // Se le credenziali sono corrette, impostiamo l'autenticazione nel Security Context
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);

            // FONDAMENTALE: leghiamo il contesto alla sessione HTTP per generare il cookie JSESSIONID
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);

            return ResponseEntity.ok("Login effettuato con successo");
        } catch (Exception e) {
            // Se le credenziali sono errate, ritorniamo 401 Unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenziali non valide");
        }
    }

    // Endpoint di Logout (Protetto)
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // Invalida la sessione lato server
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout effettuato");
    }
}