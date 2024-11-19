import { fetchData, getChats, getUsers } from "../context/contextData.js";
import { createElement } from "./common/createElement.js";
import { createCardContact } from './message/chatContacts.js';
import { createChatMessages } from "./message/chatMessages.js";
import { changeChat } from "./message/changeChat.js";
import { loader } from "./common/loader.js";


console.log('%cQuesto è un messaggio contiene istruzioni per sviluppatori !', 'color: red; font-size: 16px; font-weight: bold;');

window.onload = function () {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
};

async function displayChat() {
    const navigationBars = document.getElementById('navigationBar');
    console.log(navigationBars);

    const chatContact = document.getElementById('chatContact');

    await fetchData();

    const chats = getChats();
    const users = getUsers();

    // console.log(chats);
    // console.log(users);

    const userObj = JSON.parse(
        localStorage.getItem('userObj')
    );
    // console.log(userObj);

    const filteredChat = chats.filter(chat => chat.partecipants.includes(userObj.id));
    // console.log(filteredChat);

    // logic for single chats and groups
    const mergedChats = filteredChat.map(chat => {

        if(chat.partecipants.length === 2) {
            const sender = users.find(user => user.id === chat.partecipants.find(s => s === userObj.id));

            const receiverId = chat.partecipants.filter(id => id !== userObj.id)[0];

            // console.log(receiverId);

            const receiver = users.find(user => user.id === receiverId);
            return {
                ...chat,
                sender  : sender || null,
                receiver: receiver || null,
            };
        };

        if(chat.partecipants.length > 2) {
            const sender = users.find(user => user.id === chat.partecipants.find(s => s === userObj.id));
            // console.log(sender.id);
            const receivers = chat.partecipants.filter(id => id !== sender.id);
            // console.log(receivers);
            const groupChat = users.filter(user => receivers.includes(user.id));
            // console.log(groupChat);
            return {
                ...chat,
                sender   : sender || null,
                groupChat: groupChat || [],
            };
        };

    });

    // console.log(mergedChats);

    for (let i = 0; i < mergedChats.length; i++) {
        const s = mergedChats[i];
        console.log(s);
        
        const receiverId = s.partecipants.find(id => id !== userObj.id);
        const receiverUser = users.find(user => user.id === receiverId);
        
        let isAnimating = false; // Variabile per evitare clic multipli durante l'animazione
        
        // Funzione di gestione della media query e delle animazioni
        const handleChatViewToggle = (isChatOpen, chatMessages, chatContacts, backChat) => {
            // Evita di attivare la funzione se è in corso un'animazione
            if (isAnimating) return;
    
            isAnimating = true; // Imposta il flag di animazione a true
    
            const mediaQuery = window.matchMedia("(max-width: 768px)");
    
            if (mediaQuery.matches) {
                if (isChatOpen) {
                    chatMessages.forEach(chatMessage => {
                        chatMessage.style.left = "0";
                        chatMessage.style.zIndex = "99999";
                    });
        
                    chatContacts.forEach(chatContact => {
                        chatContact.style.left = '-30%';
                    });
                    navigationBars.style.bottom = "-15%";
                } else {
                    chatMessages.forEach(chatMessage => {
                        chatMessage.style.left = "100%";
                        chatMessage.style.zIndex = "0";
                    });
        
                    chatContacts.forEach(chatContact => {
                        chatContact.style.left = '0'; // Mostra i contatti
                    });
                    navigationBars.style.bottom = "0";
                }
            }
    
            // Gestione del pulsante di ritorno
            if (backChat) {
                backChat.removeEventListener('click', backChatClickHandler); //rm vecchio listener
                backChat.addEventListener('click', backChatClickHandler); //add nuovo listener
        
                function backChatClickHandler() {
                    handleChatViewToggle(false, chatMessages, chatContacts, backChat); // Ripristinare la vista dei contatti
                }
            }
    
            // Dopo che l'animazione è finita, ripristina il flag
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        };
    
        // Se la chat è uno a uno
        if (s.partecipants.length === 2) {
            const chat = createCardContact(
                `./assets/${receiverUser.profile_image_path}`,
                `${receiverUser.first_name} ${receiverUser.last_name}`, 
                `${s.history[s.history.length - 1].text}`, 
                "1"
            );
            chatContact.append(chat);
    
            // Crea la chat di uno a uno
            chat.addEventListener('click', () => {
                console.log(`Chat con ${receiverUser.username} cliccata`);
    
                const chatMessages = document.querySelectorAll('.chatMessage');
                const chatContacts = document.querySelectorAll('.chatContact');
                const backChat = document.getElementById('backChat');
    
                handleChatViewToggle(true, chatMessages, chatContacts, backChat); // Mostra la chat
    
                // Cambia la chat (supponendo che 'changeChat' esista)
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
    
            // Crea la chat di gruppo
            chat.addEventListener('click', () => {
                console.log('Chat di gruppo cliccata');
    
                const chatMessages = document.querySelectorAll('.chatMessage');
                const chatContacts = document.querySelectorAll('.chatContact');
                const backChat = document.getElementById('backChat');
    
                handleChatViewToggle(true, chatMessages, chatContacts, backChat); // Mostra la chat
    
                // Cambia la chat (supponendo che 'changeChat' esista)
                changeChat(s.history, s.groupName);
            });
        }
    }
    
    
}



displayChat();




























// let contact;
// function loadMessage() {
//     fetch('./json/message.json')

//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('errore nel caricamentod ei messaggi');
//             };
//             return response.json();
//         })

//         .then(messages => {
//             contact = messages.map(s => {
//                 return {
//                     author: s.author,
//                     timestamp: s.timestamp,
//                     image: s.image,
//                 }
//             });
//             const ul = document.createElement('ul');
//             ul.classList.add('ulContacts')

//             // Cicla sugli elementi di contact (che dovrebbe essere un array)
//             for (const s of contact) {

//                 const li = document.createElement('li');
//                 li.classList.add('listContacts');

//                 // li.textContent = `${s.author} - ${s.timestamp}`;

//                 const image = document.createElement('img');
//                 image.classList.add('imageContacts')
//                 image.src = `./assets/${s.image}`;

//                 const contCenter = document.createElement('div');
//                 contCenter.classList.add('contCenter')

//                     const topWhereName = document.createElement('h2');
//                     topWhereName.innerHTML = `${s.author}`;

//                     const bottomLastMessage = document.createElement('p');
//                     bottomLastMessage.innerHTML = 'messaggio inviato da ...';

//                 contCenter.append(topWhereName);
//                 contCenter.append(bottomLastMessage);





                
//                 li.append(image);
//                 li.append(contCenter)
//                 ul.appendChild(li);
//             }

//             contacts.appendChild(ul); 
//         })

//         .catch(error => {
//             console.error('Errore', error);
//         });
// }

// window.onload = loadMessage;




