export function createElement(tag, { classes = [], attributes = {}, children = [] } = {}) {
    // Create the element
    const element = document.createElement(tag);

    // Add classes
    if (classes.length) {
        element.classList.add(...classes);
    }

    // Add attributes
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });

    // Add children
    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}
