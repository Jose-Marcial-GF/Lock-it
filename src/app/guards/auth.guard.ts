import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).getUserState().pipe(
    take(1),
    map(user => user ? true : router.createUrlTree(['/home']))
  );
};

export const noAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService).getUserState().pipe(
    take(1),
    map(user => user ? router.createUrlTree(['/home']) : true)
  );
};
