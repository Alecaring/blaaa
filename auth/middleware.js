import { isLoggedIn } from '../auth/auth.js';

export function requireAuth() {
    if (!isLoggedIn()) {
        alert('Devi essere loggato per accedere');
        window.location.href = 'login.html';
    }
}
