import { fetchData, getUsers, getPosts } from '../context/contextData.js';
import { createElement } from "./common/createElement.js";
import { createStories } from "./index/createStories.js";
import { createPost } from "./index/createPost.js";
import { loader } from "./common/loader.js";

loader();

const nameElem = document.getElementById('name');
const storiesElem = document.getElementById('stories');
const postsElem = document.getElementById('posts');

const userObj = JSON.parse(
    localStorage.getItem('userObj')
);

nameElem.innerHTML = `Hi, ${userObj.firstName}`;

// -

async function stories() {
    await fetchData();

    const users = getUsers();
    const mappedUsers = users.map((s) => ({
        username: s.username,
        profile_image_path: s.profile_image_path,
        active: s.active
    }));

    for (let i = 0; i < mappedUsers.length; i++) {
        const user = mappedUsers[i];

        const contCircle = createStories(
            `./assets/${user.profile_image_path}`,
            user.active,
            i,
            `${user.username}`,
        );
        storiesElem.append(contCircle);

    }

}

async function posts() {
    await fetchData();

    const users = getUsers();

    const mappedUsers = users.map((s) => ({
        id: s.id,
        username: s.username,
        profile_image_path: s.profile_image_path,
        active: s.active
    }));

    const posts = getPosts();

    const enrichedPosts = posts.map(post => {
        const user = users.find(user => user.id === post.user_id);
        return {
            ...post,
            user: user || null,
        };
    });

    console.log(enrichedPosts);

    for (let i = 0; i < enrichedPosts.length; i++) {
        const post = enrichedPosts[i];

        const card = createPost(
            `./assets/${post.user.profile_image_path}`,
            `${post.user.username}`,
            '../assets/svg/dots.svg',
            `./assets/${post.image}`,
            '../assets/svg/hand-thumbs.svg',
            '../assets/svg/bi-heart.svg',
            '../assets/svg/bi-chat-dots.svg',
            `${post.content}`
        );
        postsElem.append(card);
    }
}


stories();
posts();

