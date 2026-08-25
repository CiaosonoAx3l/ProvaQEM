import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  // Recupera i post con la paginazione
  getPosts(page: number = 0, size: number = 20): Observable<any> {
    // Aggiungiamo un timestamp per aggirare la cache del browser
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('t', new Date().getTime()); // <--- TRUCCHETTO ANTI-CACHE
    
    return this.http.get(this.baseUrl, { 
      params: params,
      withCredentials: true 
    });
  }

  // Crea un nuovo post
  createPost(content: string): Observable<any> {
    return this.http.post(this.baseUrl, { content: content }, { 
      responseType: 'text',
      withCredentials: true 
    });
  }
}