import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; // Assicurati che punti al file corretto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importiamo FormsModule per i form
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Validazione base lato client (come da specifiche)
    if (!this.username || !this.password) {
      this.errorMessage = 'Inserisci username e password';
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        // Al login riuscito: redirect alla schermata di visualizzazione post
        this.router.navigate(['/posts']);
      },
      error: () => {
        // Gestione errore su credenziali errate
        this.errorMessage = 'Credenziali errate. Riprova.';
      }
    });
  }
}