
import { fetchData, getChats, getUsers } from "../../context/contextData.js";


export async function fetchAndFilterChats(userId) {

    await fetchData();

    const chats = getChats();
    const users = getUsers();

    const filteredChats = chats.filter(chat => chat.partecipants.includes(userId));
    
    return { filteredChats, users };
}
