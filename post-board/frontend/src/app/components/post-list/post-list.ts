import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  currentPage = 0;
  totalPages = 0;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef // <--- 1. Importiamo la Bacchetta Magica
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(page: number = 0) {
    this.postService.getPosts(page).subscribe({
      next: (res: any) => {
        console.log('Dati ricevuti:', res);
        
        // Estraiamo in modo sicuro l'array dei post
        this.posts = res.content || (Array.isArray(res) ? res : []);
        
        if (res.page) {
          this.currentPage = res.page.number;
          this.totalPages = res.page.totalPages;
        }

        // <--- 2. FORZIAMO ANGULAR AD AGGIORNARE LO SCHERMO! --->
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Errore chiamata getPosts:', err);
        if (err.status === 401 || err.status === 403) {
          this.logout(); 
        }
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}