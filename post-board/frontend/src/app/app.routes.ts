import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { PostList } from './components/post-list/post-list';
import { PostCreate } from './components/post-create/post-create';
import { authGuard } from './guards/auth-guard';
    
export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' }, // Redirect iniziale alla bacheca
  { path: 'login', component: Login },
  
  // Rotte protette dall'AuthGuard
  { path: 'posts', component: PostList, canActivate: [authGuard] },
  { path: 'create', component: PostCreate, canActivate: [authGuard] },
  
  { path: '**', redirectTo: '/posts' } // Qualsiasi URL inesistente riporta alla bacheca
];