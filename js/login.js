import { fetchData, getUsers } from "../../context/contextData.js";

const emailElem = document.getElementById('email');
const passwordElem = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
    await fetchData(); // Carica i dati
    const usersData = getUsers(); // Ottieni gli utenti caricati

    const userEmail = emailElem.value.trim();
    const userPassword = passwordElem.value.trim();

    let userFound = false;

    for (const user of usersData) {
        if (user.email === userEmail && user.password === userPassword) {
            localStorage.setItem('IDENTIFICATOR', 'tokenTemporaneo')
            userFound = true;

            // if (localStorage.getItem('IDENTIFICATOR')) {
                window.location.href = "index.html";
            // }

            break;
        }
    }

    if (!userFound) {
        alert('Credenziali non valide. Riprova.');
    }
});
