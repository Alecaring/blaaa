

export function getMergedChats(filteredChat, users, userObj) {

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

    return mergedChats;
}