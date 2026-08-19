import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  
  // Usiamo un BehaviorSubject per tenere traccia se l'utente è loggato
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  get isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials, { 
      responseType: 'text',
      withCredentials: true // FONDAMENTALE PER IL COOKIE!
    }).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { 
      responseType: 'text',
      withCredentials: true 
    }).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }
}