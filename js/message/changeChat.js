import { createChatMessages } from "./chatMessages.js";

export function changeChat( messages, username ) {

    const chatContainer = document.getElementById('chatContainer');

    // clear messages
    chatContainer.innerHTML = '';

    // update title
    const chatHeader = document.getElementById('chatHeader');
    chatHeader.innerText = `Chat con ${username}`;

    // Show messages
    messages.forEach(message => {

        const messageWrapper = createChatMessages(
            message.sender_id === 1 ? 'senderCol' : 'receiverCol',
            message.sender_id === 1 ? 'senderCloud' : 'receiverCloud',
            message.sender_id === 1 ? 'txtSender' : 'txtReceiver',
            `${message.text}`
        )
        chatContainer.appendChild(messageWrapper);

    });
}