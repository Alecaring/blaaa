import { fetchData, getChats, getUsers } from "../context/contextData.js";
import { createElement } from "./common/createElement.js";
import { createCardContact } from './message/chatContacts.js';
import { createChatMessages } from "./message/chatMessages.js";
import { changeChat } from "./message/changeChat.js";

console.log('%cQuesto è un messaggio contiene istruzioni per sviluppatori !', 'color: red; font-size: 16px; font-weight: bold;');

const chatContact = document.getElementById('chatContact');

async function displayChat() {
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

        // if chat is one to one
        if (s.partecipants.length === 2) {
    
            const chat = createCardContact(
                `./assets/${receiverUser.profile_image_path}`,
                `${receiverUser.first_name} ${receiverUser.last_name}`, 
                `${s.history[s.history.length -1].text}`, 
                "1"
            )
            chatContact.append(chat);
            
            // Aggiungi un event listener per cambiare la chat
            chat.addEventListener('click', () => {
                console.log(`Chat con ${receiverUser.username} cliccata`);
                changeChat(s.history, receiverUser.username);
            });
        }
    
        // if chat is group
        if (s.partecipants.length > 2) {

            const chat = createCardContact(
                `./assets/${s.group_image}`,
                `${s.groupName}`, 
                `${s.history[s.history.length -1].text}`,
                "1"
            )
            chatContact.append(chat);                

            chat.addEventListener('click', () => {
                console.log('Chat di gruppo cliccata');
                changeChat(s.history, 'Gruppo');
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




