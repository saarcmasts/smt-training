import { Injectable, inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class AuthService {
    private readonly TOKEN_KEY = 'auth_token';

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
}

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}