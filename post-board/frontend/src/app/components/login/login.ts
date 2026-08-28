import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Inserisci username e password.';
      return;
    }

    this.isLoading = true;

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.errorMessage = 'Credenziali errate. Riprova.';
        this.isLoading = false;
      }
    });
  }
}