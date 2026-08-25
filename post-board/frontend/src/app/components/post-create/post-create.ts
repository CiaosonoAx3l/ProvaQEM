import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Fondamentale per [(ngModel)]
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Assicurati che FormsModule sia qui!
  templateUrl: './post-create.html',
  styleUrls: ['./post-create.css']
})
export class PostCreate {
  content: string = '';
  maxLength: number = 280;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private postService: PostService, private router: Router) {}

  // Getter per calcolare i caratteri rimanenti
  get charsLeft(): number {
    return this.maxLength - this.content.length;
  }

  // Validazione: controlla che non sia vuoto (o solo spazi) e che rispetti il limite
  get isInvalid(): boolean {
    return this.content.trim().length === 0 || this.content.length > this.maxLength;
  }

  submitPost() {
    if (this.isInvalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.postService.createPost(this.content).subscribe({
      next: () => {
        // Al successo, redirigiamo l'utente alla bacheca
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.isSubmitting = false;
        // Mostriamo l'errore proveniente dal backend (es. problema di rete o validazione fallita)
        this.errorMessage = err.error || 'Errore durante la pubblicazione. Riprova più tardi.';
      }
    });
  }
}