import { fetchData, getUsers, getPosts } from '../context/contextData.js';

window.onload = function() {
    document.getElementById('loader').style.display = 'none'; // Nascondi il loader
    document.getElementById('content').style.display = 'block'; // Mostra il contenuto
  };
  

const nameElem     = document.getElementById('name');
const storiesElem  = document.getElementById('stories');
const postsElem    = document.getElementById('posts');

const userObj = JSON.parse(
    localStorage.getItem('userObj')
);

nameElem.innerHTML = `Hi, ${userObj.firstName}`;

// -

async function stories() {
    await fetchData();

    const users = getUsers();
    const mappedUsers = users.map((s) => ({
        username            : s.username,
        profile_image_path  : s.profile_image_path,
        active              : s.active
    }));

    for (let i = 0; i < mappedUsers.length; i++) {
        const user = mappedUsers[i];

        const contCircle = document.createElement('div');
        contCircle.classList.add('containerCircleSpan')

        const circle = document.createElement('span');
        circle.classList.add('circleSpan');

        const circleImage = document.createElement('img');
        circleImage.src = `./assets/${user.profile_image_path}`;

        // bordo colorato simile alle storie
        if (i % 2 === 0) {
            circle.style.border = '3px solid rgba(250, 100, 200, 70%) ';
        };

        if (user.active) {
            const activeUser = document.createElement('span');
            activeUser.classList.add('online');

            circle.append(activeUser);

        };

        const username = document.createElement('p');
        username.innerHTML = `${user.username}`;
        username.classList.add('usernameStories');


        storiesElem.append(contCircle);
        contCircle.append(circle);
        circle.append(circleImage);
        contCircle.append(username);


    }

}

async function posts() {
    await fetchData();

    const users = getUsers();
    
    const mappedUsers = users.map((s) => ({
        id                  : s.id,
        username            : s.username,
        profile_image_path  : s.profile_image_path,
        active              : s.active
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

        const card = document.createElement('div');
        card.classList.add('card');

            const cardHeader = document.createElement('div');
            cardHeader.classList.add('headerCard');

                const contCircle = document.createElement('div');
                contCircle.classList.add('contCircle');

                    const circlePostUser = document.createElement('span');
                    circlePostUser.classList.add('circlePostUser');

                        const circlePostUserImage = document.createElement('img');
                        circlePostUserImage.src = `./assets/${post.user.profile_image_path}`;

                    const headerUsername = document.createElement('p');
                    headerUsername.classList.add('usernamePost');
                    headerUsername.innerHTML = `${post.user.username}`;

                const contSvgSetting = document.createElement('div');
                contSvgSetting.innerHTML = 
                    `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                    `;

            const cardImage = document.createElement('img');
            cardImage.src = `./assets/${post.image}`;

            const cardBottom = document.createElement('div');

                const contInfoLike = document.createElement('div');
                contInfoLike.classList.add('containerInfoLike');

                    const likeGroup = document.createElement('div');
                    likeGroup.classList.add('like-group');

                        const span1 = document.createElement('span');
                        span1.classList.add('bubleLike');
                        const span2 = document.createElement('span');
                        span2.classList.add('bubleLike');
                        const span3 = document.createElement('span');
                        span3.classList.add('bubleLike');

                        const likeBtn = document.createElement('span');
                        likeBtn.innerHTML = 
                                            `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path
                                                d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg>
                                            `;

                        const loveBtn = document.createElement('span');
                        loveBtn.innerHTML = 
                                            `
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                class="bi bi-heart" viewBox="0 0 16 16">
                                                <path
                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                            </svg>
                                            `;

                        const commentBtn = document.createElement('span');
                        commentBtn.innerHTML = 
                                                `
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                                    class="bi bi-chat-dots" viewBox="0 0 16 16">
                                                    <path
                                                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    <path
                                                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                                </svg>
                                                `;



                const contTxtGroup = document.createElement('div');
                contTxtGroup.classList.add('text-group');

                    const usernamePostBottom = document.createElement('p');
                    usernamePostBottom.classList.add('usernamePost');
                    usernamePostBottom.innerHTML = `${post.user.username}`;
                    
                    const bodyPostTxt = document.createElement('span');
                    bodyPostTxt.innerHTML = `${post.content}`;


                const contComments = document.createElement('div');
                contComments.classList.add('commentPost');
                    
                    const inputComment = document.createElement('input');
                    inputComment.type = 'text';
                    inputComment.placeholder = 'comment ...';
                    inputComment.ariaLabel = 'comment';
                    inputComment.id = 'comment';


            postsElem.append(card);
                card.append(cardHeader);
                cardHeader.append(contCircle);
                    contCircle.append(circlePostUser);
                        circlePostUser.append(circlePostUserImage);
                    contCircle.append(headerUsername);
                cardHeader.append(contSvgSetting);

                card.append(cardImage);

                card.append(cardBottom);
                cardBottom.append(contInfoLike);
                    contInfoLike.append(likeGroup);
                        likeGroup.append(span1);
                        likeGroup.append(span2);
                        likeGroup.append(span3);
                        likeGroup.append(likeBtn);
                        likeGroup.append(loveBtn);
                        likeGroup.append(commentBtn);
                cardBottom.append(contTxtGroup);
                    contTxtGroup.append(usernamePostBottom);
                    contTxtGroup.append(bodyPostTxt);
                cardBottom.append(contComments);
                    contComments.append(inputComment);


    }
}


stories();
posts();

