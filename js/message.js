import { createCardContact } from './message/chatContacts.js';
import { changeChat } from "./message/changeChat.js";
import { loader } from "./common/loader.js";
import { fetchAndFilterChats } from "./message/fetchAndFilterChats.js";
import { userDataLocalStorage } from "./common/getUserDataLocalStorage.js";
import { getMergedChats } from "./message/mergedChats.js";
import { handleChatAnimations } from "./message/handleChatViewToggle.js";
import { createChatMessages } from "./message/chatMessages.js";

console.log('%cMessaggio per sviluppatori: codice avviato!', 'color: red; font-size: 15px; font-weight: bold;');

loader();

async function displayChat() {
    const navigationBars = document.getElementById('navigationBar');
    const chatContact = document.getElementById('chatContact');
    const backChat = document.getElementById('backChat');
    const sendMsgBtn = document.getElementById('send');
    const textMessageI = document.getElementById('message');
    const bodyChat = document.getElementById('bodyChat');

    let activeChatId = null; // Variabile per tracciare la chat attiva

    backChat.style.display = 'none';

    const userObj = userDataLocalStorage();
    const { filteredChats, users } = await fetchAndFilterChats(userObj.id);

    const mergedChats = getMergedChats(filteredChats, users, userObj);

    for (let chatData of mergedChats) {
        const receiverId = chatData.partecipants.find(id => id !== userObj.id);
        const receiverUser = users.find(user => user.id === receiverId);
        const isGroupChat = chatData.partecipants.length > 2;

        const chat = createCardContact(
            isGroupChat ? chatData.group_image : `./assets/${receiverUser.profile_image_path}`,
            isGroupChat ? chatData.groupName : `${receiverUser.first_name} ${receiverUser.last_name}`,
            chatData.history.length ? chatData.history[chatData.history.length - 1].text : '',
            "1"
        );

        chatContact.append(chat);

        chat.addEventListener('click', () => {
            activeChatId = chatData.id; // Imposta la chat attiva

            const mediaQuery = window.matchMedia("(max-width: 768px)");
            if (mediaQuery.matches) {
                backChat.style.display = 'block';
            } else {

                backChat.style.display = 'none';
            }


            handleChatAnimations(true, document.querySelectorAll('.chatMessage'), document.querySelectorAll('.chatContact'), navigationBars);

            updateChatUI(chatData, userObj, receiverUser?.username, chatData.groupName);

            // Aggiorna il listener del pulsante di invio
            sendMsgBtn.onclick = () => {
                const messageText = textMessageI.value.trim();
                if (!messageText) {
                    alert("Il messaggio non può essere vuoto!");
                    return;
                }

                chatData.history.push({
                    sender_id: userObj.id,
                    text: messageText,
                    timestamp: Date.now(),
                });

                updateChatUI(chatData, userObj, receiverUser?.username, chatData.groupName);
                textMessageI.value = ''; // Pulisci il campo del messaggio
            };
        });
    }

    backChat.addEventListener('click', () => {
        activeChatId = null; // Reset della chat attiva
        backChat.style.display = 'none';
        handleChatAnimations(false, document.querySelectorAll('.chatMessage'), document.querySelectorAll('.chatContact'), navigationBars);
    });
}

function updateChatUI(chatData, userObj, username, groupName) {
    const chatContainer = document.getElementById('chatContainer');
    const chatHeader = document.getElementById('chatHeader');
    const bodyChat = document.getElementById('bodyChat');

    chatContainer.innerHTML = '';
    chatHeader.innerText = groupName || username;

    chatData.history.forEach(message => {
        const messageWrapper = createChatMessages(
            message.sender_id === userObj.id ? 'senderCol' : 'receiverCol',
            message.sender_id === userObj.id ? 'senderCloud' : 'receiverCloud',
            message.sender_id === userObj.id ? 'txtSender' : 'txtReceiver',
            message.text
        );

        chatContainer.appendChild(messageWrapper);
    });

    bodyChat.scrollTop = bodyChat.scrollHeight; // Scorri in fondo
}

displayChat();
