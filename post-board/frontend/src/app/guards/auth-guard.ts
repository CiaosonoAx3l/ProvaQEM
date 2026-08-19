import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedInValue) {
    return true; // Lascia passare
  } else {
    // Non è loggato, lo rispediamo al login
    return router.createUrlTree(['/login']);
  }
};