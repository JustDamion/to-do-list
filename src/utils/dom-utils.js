function createDomElement(tag, classAttribute, textContent = null) {
  const element = document.createElement(tag);
  element.setAttribute("class", classAttribute);

  if (textContent !== null) {
    element.textContent = textContent;
  }

  return element;
}

export { createDomElement };
