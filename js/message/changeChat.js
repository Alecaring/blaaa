import { createChatMessages } from "./chatMessages.js";

export function changeChat(messages, username, userObj) {
    const chatContainer = document.getElementById('chatContainer');
    const textMessageI = document.getElementById('message'); // Controlla che esista

    // Verifica se l'input è stato trovato
    if (textMessageI) {
        // Clear the input field
        textMessageI.value = ''; // Resetta l'input
    } else {
        console.error("Input del messaggio non trovato!");
    }

    // Clear existing messages
    chatContainer.innerHTML = '';

    // Update the title of the chat
    const chatHeader = document.getElementById('chatHeader');
    chatHeader.innerText = username; // Usare il nome dell'utente o del gruppo

    // Show the messages of the selected chat
    messages.forEach(message => {
        const messageWrapper = createChatMessages(
            message.sender_id === userObj.id ? 'senderCol' : 'receiverCol',
            message.sender_id === userObj.id ? 'senderCloud' : 'receiverCloud',
            message.sender_id === userObj.id ? 'txtSender' : 'txtReceiver',
            message.text
        );

        chatContainer.appendChild(messageWrapper);
    });

    // Scroll to the bottom of the chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
