export function handleChatAnimations(isChatOpen, chatMessages, chatContacts, navigationBars) {
    let isAnimating = false;

    // Evita di avviare l'animazione se è già in corso
    if (isAnimating) return;

    isAnimating = true; // Imposta il flag per indicare che l'animazione è in corso

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Gestisce le animazioni in base alla larghezza dello schermo
    if (mediaQuery.matches) {
        if (isChatOpen) {
            chatMessages.forEach(chatMessage => {
                chatMessage.style.left = "0";
                chatMessage.style.zIndex = "99999";
                chatMessage.classList.add('slideIn'); // Aggiungi la classe di animazione
            });

            chatContacts.forEach(chatContact => {
                chatContact.style.left = '-30%';
            });
            navigationBars.style.bottom = "-15%";
        } else {
            chatMessages.forEach(chatMessage => {
                chatMessage.style.left = "100%";
                chatMessage.style.zIndex = "0";
                chatMessage.classList.remove('slideOut'); // Aggiungi la classe di animazione
            });

            chatContacts.forEach(chatContact => {
                chatContact.style.left = '0';
            });
            navigationBars.style.bottom = "0";
        }
    }

    // Dopo che l'animazione è terminata, ripristina il flag
    setTimeout(() => {
        isAnimating = false;
    }, 500); // Dura 500ms (può essere modificato)
}
