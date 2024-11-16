import { fetchData, getChats, getUsers } from "../context/contextData.js";

const chatContact = document.getElementById('chatContact');
const chatMessage = document.getElementById('chatMessage');



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
    console.log(mergedChats);
    console.log('%cQuesto è un messaggio stilizzato!', 'color: red; font-size: 16px; font-weight: bold;');


    for (let i = 0; i < mergedChats.length; i++) {
        const s = mergedChats[i];
        console.log(s);
        
    
        if (s.partecipants.length === 2) {
    
            const receiverId = s.partecipants.find(id => id !== userObj.id); // Assumendo che userObj.id sia l'ID dell'utente corrente
            const receiverUser = users.find(user => user.id === receiverId);
    
            const chat = document.createElement('div');
            chat.classList.add('chat');

                const chatLeft = document.createElement('div');
                chatLeft.classList.add('chatLeft');
                    const circleImage = document.createElement('div');
                    circleImage.classList.add('circleChat');
                        const image = document.createElement('img');
                        image.src = `./assets/${receiverUser.profile_image_path}`;
                    const txtContentChat = document.createElement('div');
                    txtContentChat.classList.add('txtContentChat');
                        const name = document.createElement('p');
                        name.innerHTML = `${receiverUser.first_name} ${receiverUser.last_name}`;
                        name.classList.add('nameChat');
                        const lastMessage = document.createElement('span');
                        lastMessage.classList.add('lastMessage');
                        lastMessage.innerHTML = `${s.history[s.history.length -1].text}`;

                const chatRight = document.createElement('div');
                    const numUnreadMessage = document.createElement('span');
                    numUnreadMessage.classList.add('numUnreadMessage');
                    numUnreadMessage.innerHTML = "1";

            // test.innerHTML = `${receiverUser.username}`;
            
            // Aggiungi un event listener per cambiare la chat
            chat.addEventListener('click', () => {
                console.log(`Chat con ${receiverUser.username} cliccata`);
                changeChat(s.history, receiverUser.username);
            });
    
            // Aggiungi il bottone al contenitore
            chatContact.append(chat);
                chat.append(chatLeft);
                    chatLeft.append(circleImage);
                        circleImage.append(image);
                    chatLeft.append(txtContentChat);
                        txtContentChat.append(name);
                        txtContentChat.append(lastMessage);
                chat.append(chatRight);
                    chatRight.append(numUnreadMessage);
        }
    
if (s.partecipants.length > 2) {


    const chat = document.createElement('div');
            chat.classList.add('chat');

                const chatLeft = document.createElement('div');
                chatLeft.classList.add('chatLeft');
                    const circleImage = document.createElement('div');
                    circleImage.classList.add('circleChat');
                        const image = document.createElement('img');
                        image.src = `${s.group_image}`;
                    const txtContentChat = document.createElement('div');
                    txtContentChat.classList.add('txtContentChat');
                        const name = document.createElement('p');
                        name.innerHTML = `${s.groupName}`;
                        name.classList.add('nameChat');
                        const lastMessage = document.createElement('span');
                        lastMessage.classList.add('lastMessage');
                        lastMessage.innerHTML = `${s.history[s.history.length -1].text}`;

                const chatRight = document.createElement('div');
                    const numUnreadMessage = document.createElement('span');
                    numUnreadMessage.classList.add('numUnreadMessage');
                    numUnreadMessage.innerHTML = "1";
    
    // Crea un contenitore per i bottoni dei partecipanti
    const groupContainer = document.createElement('div');
    groupContainer.style.padding = '2rem';

    

    chat.addEventListener('click', () => {
        console.log('Chat di gruppo cliccata');
        changeChat(s.history, 'Gruppo');
    });

    const participantSpan = document.createElement('span');
    participantSpan.style.padding = '0.5rem';
    participantSpan.style.display = 'block';
    participantSpan.innerHTML = `${s.groupName}`;

    // Crea un bottone o una rappresentazione per ogni partecipante
    for (let i = 0; i < s.partecipants.length; i++) {
        const participantId = s.partecipants[i];
        const participant = users.find(user => user.id === participantId);
        
        // Verifica che il partecipante esista
        if (participant) {
            chatContact.append(chat);
            chat.append(chatLeft);
                chatLeft.append(circleImage);
                    circleImage.append(image);
                chatLeft.append(txtContentChat);
                    txtContentChat.append(name);
                    txtContentChat.append(lastMessage);
            chat.append(chatRight);
                chatRight.append(numUnreadMessage);
            
        }
    }

    }

    }
    




    // Funzione per cambiare chat
    function changeChat(messages, username) {
        // Seleziona il contenitore principale della chat
        const chatContainer = document.getElementById('chatContainer');
    
        // Svuota i messaggi precedenti
        chatContainer.innerHTML = '';
    
        // Aggiorna il titolo della chat
        const chatHeader = document.getElementById('chatHeader');
        chatHeader.innerText = `Chat con ${username}`;
    
        // Mostra i nuovi messaggi
        messages.forEach(message => {
            // Crea un contenitore per il messaggio
            const messageWrapper = document.createElement('div');
            messageWrapper.className = message.sender_id === 1 ? 'senderCol' : 'receiverCol';
    
            // Crea la nuvoletta per il messaggio
            const messageCloud = document.createElement('div');
            messageCloud.className = message.sender_id === 1 ? 'senderCloud' : 'receiverCloud';
    
            // Crea il testo del messaggio
            const messageText = document.createElement('p');

            message.sender_id === 1 ?
                messageText.classList.add('txtSender')
                : messageText.classList.add('txtReceiver');
                
            messageText.innerHTML = `${message.text}`;
    
            // Costruisci la struttura
            messageCloud.appendChild(messageText);
            messageWrapper.appendChild(messageCloud);
            chatContainer.appendChild(messageWrapper);
        });
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




