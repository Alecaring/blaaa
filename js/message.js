import { createCardContact } from './message/chatContacts.js';
import { changeChat } from "./message/changeChat.js";
import { loader } from "./common/loader.js";
import { fetchAndFilterChats } from "./message/fetchAndFilterChats.js";
import { userDataLocalStorage } from "./common/getUserDataLocalStorage.js";
import { getMergedChats } from "./message/mergedChats.js";
import { handleChatAnimations } from "./message/handleChatViewToggle.js";

console.log('%cQuesto è un messaggio contiene istruzioni per sviluppatori !', 'color: red; font-size: 15px; font-weight: bold;');

loader();

async function displayChat() {

    const navigationBars = document.getElementById('navigationBar');
    const chatContact = document.getElementById('chatContact');
    const backChat = document.getElementById('backChat'); // Bottone Indietro

    // Inizialmente, il bottone indietro è nascosto
    backChat.style.display = 'none';

    // Prendi i dati dall'localStorage
    const userObj = userDataLocalStorage();
    const { filteredChats, users } = await fetchAndFilterChats(userObj.id);

    // Ottieni una lista di chat unita con gli utenti e i messaggi filtrati
    const mergedChats = getMergedChats(filteredChats, users, userObj);

    for (let i = 0; i < mergedChats.length; i++) {
        const s = mergedChats[i];

        const receiverId = s.partecipants.find(id => id !== userObj.id);
        const receiverUser = users.find(user => user.id === receiverId);

        // Se la chat è uno a uno
        if (s.partecipants.length === 2) {
            const chat = createCardContact(
                `./assets/${receiverUser.profile_image_path}`,
                `${receiverUser.first_name} ${receiverUser.last_name}`, 
                `${s.history[s.history.length - 1].text}`, 
                "1"
            );
            chatContact.append(chat);

            // Aggiungi l'event listener per la chat privata
            chat.addEventListener('click', () => {
                console.log(`Chat con ${receiverUser.username} cliccata`);

                const chatMessages = document.querySelectorAll('.chatMessage');
                const chatContacts = document.querySelectorAll('.chatContact');

                // Mostra il bottone Indietro e applica le animazioni
                backChat.style.display = 'block';

                // Applica le animazioni per aprire la chat
                handleChatAnimations(true, chatMessages, chatContacts, navigationBars);
                changeChat(s.history, receiverUser.username);
            });
        }

        // Se la chat è di gruppo
        if (s.partecipants.length > 2) {
            const chat = createCardContact(
                `${s.group_image}`,
                `${s.groupName}`, 
                `${s.history[s.history.length - 1].text}`,
                "1"
            );
            chatContact.append(chat);

            // Aggiungi l'event listener per la chat di gruppo
            chat.addEventListener('click', () => {
                console.log('Chat di gruppo cliccata');

                const chatMessages = document.querySelectorAll('.chatMessage');
                const chatContacts = document.querySelectorAll('.chatContact');

                // Mostra il bottone Indietro e applica le animazioni
                backChat.style.display = 'block';

                // Applica le animazioni per aprire la chat
                handleChatAnimations(true, chatMessages, chatContacts, navigationBars);
                changeChat(s.history, s.groupName);
            });
        }
    }

    // Aggiungi il listener per il bottone Indietro
    backChat.addEventListener('click', () => {
        console.log('Tornando alla lista chat...');

        const chatMessages = document.querySelectorAll('.chatMessage');
        const chatContacts = document.querySelectorAll('.chatContact');

        // Nascondi la chat e mostra la lista di contatti
        backChat.style.display = 'none'; // Nascondi il bottone
        handleChatAnimations(false, chatMessages, chatContacts, navigationBars);
    });
}

displayChat();
