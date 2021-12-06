function createElement(tagName, options) {
    return document.createElement(tagName, options)
}

function createTextNode(text) {
    return document.createTextNode(text)
}

function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node, child) {
    node.removeChild(child)
}

function appendChild(node, child) {
    node.appendChild(child)
}

function parentNode(node) {
    return node.parentNode
}

function nextSibling(node) {
    return node.nextSibling
}

function tagName(elm) {
    return elm.tagName
}

function setTextContent(node, text) {
    node.textContent = text
}

export const htmlDomApi = {
    createElement,
    createTextNode,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
}