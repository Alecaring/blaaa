import { createElement } from "../common/createElement.js";

export function createStories(imagePath, userActive, index, username) {
    return createElement('div', {
        classes: ['containerCircleSpan'],
        attributes: {},
        children: [
            createElement('span', {
                classes: ['circleSpan', index % 2 === 0 && 'unridedStory'],
                attributes: {},
                children: [
                    createElement('img', {
                        classes: [],
                        attributes: {
                            src: imagePath
                        },
                        children: []
                    }),
                    createElement('span', {
                        classes: [userActive && 'online'],
                    })
                ],
            }),
            createElement('p', {
                classes: ['usernameStories'],
                attributes: {},
                children: [
                    username
                ],
            }),
        ],
    });
}