class Engine {
  constructor(){
    this.appRoot = null;
    this.tree = null;
    this.clicks = -1;
  }

  createElement(config) {

    const { tag = 'div', attr = false, children } = config;
    const element = document.createElement(tag);

    // TODO see if re-render is needed

    // apply any attributes
    if (attr) {
      Array.from(Object.keys(attr))
        .forEach((key) => {
          const value = attr[key];

          // apply event listeners
          if (typeof value === 'function') {
            const eventName = key.replace('on', ''); // onclick => click
            element.addEventListener(eventName, value);
          } else {
            element.setAttribute(key, value);
          }
        })
    }
    return { tag, attr, children, element };
  };

  init(template, appRoot) {
    this.appRoot = appRoot;
    this.render(template, appRoot);
  }

  // walk entire tree starting at top
  // if diff is found, re-render that node
    // from parent, set innerHTML to '' and append all children
  // recursively check all child nodes until each is re-rendered or left alone

  getDiff(next, prev) {
    // if (prev) 
    const prevTree = prev || this.tree;
    if (!prev) return false;

    const { tag: prevTag, attr: prevAttr, children: prevChildren } = prev;
    const { tag: nextTag, attr: nextAttr, children: nextChildren } = next;

    // tag changed, update
    if (prevTag !== nextTag) return true;

    // skipping attributes for now

    // children
    const prevChildrenIsArray = prevChildren && prevChildren.map;
    const nextChildrenIsArray = nextChildren && nextChildren.map;
    if (prevChildrenIsArray !== nextChildrenIsArray) {
      return true;
    }

    if (prevChildren.length !== nextChildren.length) {
      return true;
    }
  }

  render(tree) {
    const {
      tag = 'div',
      attr = false,
      element,
      children,
      root = true,
      parent = this.appRoot
    } = tree;

    const isDiff = this.getDiff(tree);
    console.log(isDiff);

    // if there is a value for children
    if (![false, null, undefined].includes(children)) {

      // recursively render children into nodes and append to parent
      if (children.map) {
        children.forEach((child) => {
          this.render({ ...child, root: false, parent: element });
        });
      } else {
        element.innerHTML = children.toString();
      }
    }

    parent.appendChild(element);

    // cache tree from root
    if (root) this.tree = tree;
  };

  renderNode() {

  }

  output() {

  }
};

export default new Engine();
