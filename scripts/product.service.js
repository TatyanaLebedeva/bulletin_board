export function addElementWithText(tag, text, className) {
    let textElement = addElement(tag, className);
    textElement.append(document.createTextNode(text));
    return textElement;
}

export function addElement(tag, className) {
    let element = document.createElement(tag);
    element.className = className;
    return element;
}