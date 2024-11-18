import { createElement } from "../common/createElement.js";

export function createChatMessages( dinClassMessage_Col, dinClassMessage_Cloud, dinClassMessage_Txt, txt ) {

    return createElement('div', {
        classes: [
            dinClassMessage_Col,
        ],
        attributes: {},
        children: [
            createElement('div', {
                classes: [
                    dinClassMessage_Cloud,
                ],
                attributes: {},
                children: [
                    createElement('p', {
                        classes: [
                            dinClassMessage_Txt
                        ],
                        attributes: {},
                        children: [
                            txt
                        ],
                    })
                ],
            })
        ],
    });
}