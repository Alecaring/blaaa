const emailElem = document.getElementById('email');
const passwordElem = document.getElementById('password');
const accessBtn = document.getElementById('access');
const fillLoginBtn = document.getElementById('fillLogin');
const containerSuggestElem = document.getElementById('containerSuggest');
const fildlistEmail = document.getElementById('fildlistEmail');
const fildlistPassword = document.getElementById('fildlistPassword');
const errors = document.getElementById('errors');

const objSuggest = [
    {
        icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>`,
        email: "pippo@gmail.com",
        password: "myPassword123",
    },
    {
        icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>`,
        email: "pluto@gmail.com",
        password: "myPassword123",
    },
    {
        icon: ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>`,
        email: "paperino@gmail.com",
        password: "myPassword123",
    },
]


const redirect = () => {
    window.location.href = "/index.html";
}

accessBtn.addEventListener('click', () => {
    const email = emailElem.value;
    const password = passwordElem.value;

    // check email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        fildlistEmail.style.color = "red";
        fildlistEmail.style.borderColor = "red"
        errors.style.display = "block";
        errors.innerHTML = "Inserisci un'email valida."
        return;
    } else {
        fildlistEmail.style.color = "green";
        fildlistEmail.style.borderColor = "green"

    }

    // check password
    if (password.length < 6) {
        fildlistPassword.style.color = "red";
        fildlistPassword.style.borderColor = "red";
        errors.style.display = "block";
        errors.innerHTML = "La password deve essere lunga almeno 6 caratteri.";
        return;
    } else {
        fildlistPassword.style.color = "green";
        fildlistPassword.style.borderColor = "green"

    }

    // Confronto delle credenziali
    if (email === "pippo@gmail.com" && password === "myPassword123") {
        localStorage.setItem('IDENTIFICATOR', 'userId:1');
        redirect();
    } else if (email === "pluto@gmail.com" && password === "myPassword123") {
        localStorage.setItem('IDENTIFICATOR', 'userId:2');
        redirect();
    } else if (email === "paperino@gmail.com" && password === "myPassword123") {
        localStorage.setItem('IDENTIFICATOR', 'userId:3');
        redirect();
    } else {
        errors.style.display = "block";
        errors.innerHTML = "Email o password non corretti. Riprova.";
    }
});


let suggestHTML = '';
objSuggest.forEach((s, index) => {
    suggestHTML += `
        <li>
            <div class="contTxt">
                <p>${s.email}</p>
                <small>${s.password}</small>
            </div>
            <div class="svgCell" data-index="${index}">
                ${s.icon}
            </div>
        </li>
    `;
});

containerSuggestElem.innerHTML = suggestHTML;

// Add click event to each icon
const icons = document.querySelectorAll('.svgCell');
icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        const index = event.target.closest('.svgCell').getAttribute('data-index');
        const selectedData = objSuggest[index];
        emailElem.value = selectedData.email;
        passwordElem.value = selectedData.password;
    });
});





