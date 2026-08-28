import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  
  // Inizializza lo stato leggendo il localStorage
  private loggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  get isLoggedInValue(): boolean {
    return this.loggedIn.value;
  }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/register`, userData, { 
      responseType: 'text'
    });
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials, { 
      responseType: 'text',
      withCredentials: true 
    }).pipe(
      tap(() => {
        localStorage.setItem('isLoggedIn', 'true');
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, {}, { 
      responseType: 'text',
      withCredentials: true 
    }).pipe(
      tap(() => {
        localStorage.removeItem('isLoggedIn');
        this.loggedIn.next(false);
      })
    );
  }
}