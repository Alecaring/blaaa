import {createElement} from '../common/createElement.js';

export function createCardContact (userImg, userName, lastMessage, messagesUnread) {

    // chatContacts
    return createElement('div', {
        classes     : ['chat'],
        attributes  : {},
        children    : [

            // leftBox inner chat
            createElement('div', {
                classes     : ['chatLeft'],
                attributes  : {},
                children    : [

                    // circle container for image
                    createElement('div', {
                        classes     : ['circleChat'],
                        attributes  : {},
                        children    : [
                            
                            // image user
                            createElement('img', {
                                classes     : [],
                                attributes  : { 
                                    src: userImg,
                                },
                                children    : [],
                            }),
                        ],
                    }),

                    // CONTAINER name and last message user chat
                    createElement('div', {
                        classes     : ['txtContentChat'],
                        attributes  : {},
                        children    : [

                            // complete name displayed
                            createElement('p', {
                                classes     : ['nameChat'],
                                attributes  : {},
                                children    : [
                                    userName,
                                ],
                            }),

                            // last message dispayed
                            createElement('span', {
                                classes     : ['lastMessage'],
                                attributes  : {},
                                children    : [
                                    lastMessage,
                                ],
                            })
                        ],
                    }),
                ],
            }),

            // rightBox inner chat
            createElement('div', {
                classes     : [],
                attributes  : {},
                children    : [
                    createElement('span', {
                        classes     : ['numUnreadMessage'],
                        attributes  : {},
                        children    : [
                            messagesUnread,
                        ],
                    }),
                ],
            }),
        ],
    });
};