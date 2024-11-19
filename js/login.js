import { login } from '../auth/auth.js';

console.log('%cQuesto è un messaggio contiene istruzioni per sviluppatori !', 'color: red; font-size: 16px; font-weight: bold;');

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (await login(username, password)) {
        window.location.href = 'index.html';
    } else {
        console.log(login());
        errorMessage.style.padding = '1rem 2rem';
        errorMessage.style.border = ".1px solid red"
        errorMessage.textContent = 'Username o Password non corretti';
    };
});