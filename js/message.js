const contacts = document.getElementById('contacts');

let contact;
function loadMessage() {
    fetch('./json/message.json')

        .then(response => {
            if (!response.ok) {
                throw new Error('errore nel caricamentod ei messaggi');
            };
            return response.json();
        })

        .then(messages => {
            contact = messages.map(s => {
                return {
                    author: s.author,
                    timestamp: s.timestamp,
                    image: s.image,
                }
            });
            const ul = document.createElement('ul');
            ul.classList.add('ulContacts')

            // Cicla sugli elementi di contact (che dovrebbe essere un array)
            for (const s of contact) {

                const li = document.createElement('li');
                li.classList.add('listContacts');

                // li.textContent = `${s.author} - ${s.timestamp}`;

                const image = document.createElement('img');
                image.classList.add('imageContacts')
                image.src = `./assets/${s.image}`;

                const contCenter = document.createElement('div');
                contCenter.classList.add('contCenter')

                    const topWhereName = document.createElement('h2');
                    topWhereName.innerHTML = `${s.author}`;

                    const bottomLastMessage = document.createElement('p');
                    bottomLastMessage.innerHTML = 'messaggio inviato da ...';

                contCenter.append(topWhereName);
                contCenter.append(bottomLastMessage);





                
                li.append(image);
                li.append(contCenter)
                ul.appendChild(li);
            }

            contacts.appendChild(ul); 
        })

        .catch(error => {
            console.error('Errore', error);
        });
}

window.onload = loadMessage;




