export const h = (tag = 'div', attributes = false, children) => {
  console.log(tag);
  const element = document.createElement(tag);
  if (attributes) {
    Array.from(Object.keys(attributes))
      .forEach((key) => {
        const value = attributes[key];
        if (typeof value === 'function') {
          const eventName = key.replace('on', ''); // onclick => click
          element.addEventListener(eventName, value);
        } else {
          element.setAttribute(key, value);
        }
      })
  }
  if (children) {
    console.log({ children });
    if (typeof children === 'string') {
      element.innerHTML = children;
    } else if (typeof children === 'object' && children.map) {
      console.log('here');
      children.forEach((child) => {
        const childNode = h(child);
        element.appendChild(childNode);
      });

    }
  }
  return element;
};
