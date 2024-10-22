import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const favoritesGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const router = inject(Router);
  console.log(role);
  
  if(role == "Admin" || role == "Moderator" || role == "User") return true;
  else {
    router.navigate(['']);
    return false;
  }
};
