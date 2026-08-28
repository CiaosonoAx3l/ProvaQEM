import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  // Modello dati per il form
  user = {
    username: '',
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private router: Router,private cdr: ChangeDetectorRef) {}

  // Validazione di base
  get isInvalid(): boolean {
    return !this.user.username || !this.user.email || !this.user.password;
  }

  onSubmit() {
    if (this.isInvalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register(this.user).subscribe({
      next: (res: any) => { // <-- Aggiunto : any
        alert('Registrazione completata con successo! Ora puoi accedere.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => { // <-- Aggiunto : any
        console.error('Errore ricevuto dal backend:', err); // Utile per debug
        this.isSubmitting = false;
        this.errorMessage = err.error || 'Errore durante la registrazione.';
        this.cdr.detectChanges();
      }
    });
  }
}