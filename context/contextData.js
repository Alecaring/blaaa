const context = {
    users: [],
    posts: [],
    chats: [],
}

export async function fetchData() {
    try {
        const [users, posts, chats] = await Promise.all([

            fetch('../json/users.json').then(res => res.json()),
            fetch('../json/posts.json').then(res => res.json()),
            fetch('../json/chats.json').then(res => res.json()),
        ]);

        // saving data into the context
        context.users = users;
        context.posts = posts;
        context.chats = chats;

    } catch (error) {
        console.error("error fetching data", error);
    }
}

// getter for data
export function getUsers() {
    return context.users;
}

export function getPosts() {
    return context.posts;
}

export function getChats() {
    return context.chats;
}

