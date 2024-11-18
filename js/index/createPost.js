import { createElement } from "../common/createElement.js";


export function createPost(userImage, username, dotsSvg, postImage, handThumbsSvg, heartSvg, cloudSvg, postContentTxt) {

    return createElement('div', {
        classes: ['card'],
        attributes: {},
        children: [
            createElement('div', {
                classes: ['headerCard'],
                attributes: {},
                children: [
                    createElement('div', {
                        classes: ['contCircle'],
                        attributes: {},
                        children: [
                            createElement('span', {
                                classes: ['circlePostUser'],
                                attributes: {},
                                children: [
                                    createElement('img', {
                                        classes: [],
                                        attributes: {
                                            src: userImage,
                                            // src: `./assets/${post.user.profile_image_path}`
                                        },
                                        children: [],
                                    }),
                                ],
                            }),
                            createElement('p', {
                                classes: ['usernamePost'],
                                attributes: {},
                                children: [
                                    username
                                    // `${post.user.username}`
                                ],
                            }),
                        ],
                    }),
                    createElement('div', {
                        classes: [],
                        attributes: {},
                        children: [
                            createElement('img', {
                                classes: [],
                                attributes: { 
                                    src: dotsSvg
                                    // src: '../assets/svg/dots.svg' 
                                },
                                children: [],
                            }),
                        ],
                    }),
                ],
            }),
            createElement('img', {
                classes: [],
                attributes: { 
                    src: postImage
                    // src: `./assets/${post.image}` 
                },
                children: [],
            }),
            createElement('div', {
                classes: [],
                attributes: {},
                children: [
                    createElement('div', {
                        classes: ['containerInfoLike'],
                        attributes: {},
                        children: [
                            createElement('div', {
                                classes: ['like-group'],
                                attributes: {},
                                children: [
                                    createElement('span', {
                                        classes: ['bubleLike'],
                                        attributes: {},
                                        children: [],
                                    }),
                                    createElement('span', {
                                        classes: ['bubleLike'],
                                        attributes: {},
                                        children: [],
                                    }),
                                    createElement('span', {
                                        classes: ['bubleLike'],
                                        attributes: {},
                                        children: [],
                                    }),
                                    createElement('span', {
                                        classes: [],
                                        attributes: {},
                                        children: [
                                            createElement('img', {
                                                classes: [],
                                                attributes: { 
                                                    src: handThumbsSvg
                                                    // src: '../assets/svg/hand-thumbs.svg' 
                                                },
                                                children: [],
                                            }),
                                        ],
                                    }),
                                    createElement('span', {
                                        classes: [],
                                        attributes: {},
                                        children: [
                                            createElement('img', {
                                                classes: [],
                                                attributes: { 
                                                    src: heartSvg
                                                    // src: '../assets/svg/bi-heart.svg' 
                                                },
                                                children: [],
                                            }),
                                        ],
                                    }),
                                    createElement('span', {
                                        classes: [],
                                        attributes: {},
                                        children: [
                                            createElement('img', {
                                                classes: [],
                                                attributes: { 
                                                    src: cloudSvg
                                                    // src: '../assets/svg/bi-chat-dots.svg' 
                                                },
                                                children: [],
                                            }),
                                        ],
                                    }),
                                ],
                            })
                        ],
                    }),
                    createElement('div', {
                        classes: ['text-group'],
                        attributes: {},
                        children: [
                            createElement('p', {
                                classes: ['usernamePost'],
                                attributes: {},
                                children: [
                                    username
                                    // `${post.user.username}`
                                ],
                            }),
                            createElement('span', {
                                classes: [],
                                attributes: {},
                                children: [
                                    postContentTxt
                                    // `${post.content}`
                                ],
                            }),
                        ],
                    }),
                    createElement('div', {
                        classes: ['commentPost'],
                        attributes: {},
                        children: [
                            createElement('input', {
                                classes: [],
                                attributes: {
                                    type: 'text',
                                    placeholder: 'comment ...',
                                    ariaLabel: 'comment',
                                    id: 'comment',
                                },
                                children: []
                            })
                        ],
                    })
                ],
            })
        ],
    });
}