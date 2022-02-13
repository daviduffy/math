export class Engine {
  constructor() {
    this.$vdom = null;
    this.$root = null;
  }

  start($root, template) {
    this.$root = $root;
    this.$vdom = template;
    this.updateElement(this.$root, this.$vdom);
  }

  // turns `h` calls into virtual dom structure
  h(node = 'div', attr = false, ...children) {
    return { node, attr, children };
  }

  createElement ({ node = 'div', attr = false, children }) {
    const $el = document.createElement(node);

    // apply any attributes
    if (attr) {
      Array.from(Object.keys(attr)).forEach((key) => {
        const value = attr[key];

        // apply event listeners
        if (typeof value === 'function') {
          const eventName = key.replace('on', ''); // onclick => click
          $el.addEventListener(eventName, value);
        } else {
          $el.setAttribute(key, value);
        }
      });
    }

    // append any children
    if (children) {
      Array.from(children).forEach((child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          const text = child.toString();
          $el.appendChild(document.createTextNode(text));
        } else {
          const $child = this.createElement(child);
          $el.appendChild($child);
        }
      });
    }
    return $el;
  }

  changed(node1, node2) {
    // different strings or different numbers
    if (typeof node1 === 'string' && node1 !== node2
      || typeof node1 === 'number' && node1 !== node2) {
      return true;
    } else {
      return false;
    }
    // tag changed, update
    if (node1.tag !== node2.tag) return true;

    // basic attribute diffing only
    const attrs1 = Object.keys(node1.attr);
    const attrs2 = Object.keys(node2.attr);
    if (attrs1.length !== attrs2.length
        // if merged keys is longer then there is a diff
        || Array.from(new Set([...attrs1, ...attrs2])).length !== attrs1.length) {
      return true;
    }

    let mismatch = false;
    for (const key in attrs2) {
      if (attrs2[key] !== attrs1[key]) {
        mismatch = true;
        break;
      }
    }
    return mismatch;
  }

  /*
    compares two virtual dom nodes
    these are javascript objects, not real DOM nodes
  */
  updateElement($parent, newNode, oldNode, index = 0) {
    // there's a new node but no old node
    if (oldNode === undefined || oldNode === null) {
      $parent.appendChild(this.createElement(newNode));
    // there's an old node but no new node
    } else if (newNode === undefined || newNode === null) {
      $parent.removeChild($parent.childNodes[index]);
    } else if (newNode === oldNode) {
    // both nodes exist but they have changed
    } else if (this.changed(oldNode, newNode)) {
      const useTextNode = typeof newNode === 'string' || typeof newNode === 'number';
      $parent.replaceChild(
        useTextNode ? document.createTextNode(newNode) : this.createElement(newNode),
        $parent.childNodes[index]
      );
    // handle any children
    } else {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        this.updateElement(
          $parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
  }

  render(newNode) {
    this.updateElement(this.$root, newNode, this.$vdom);
    this.$vdom = newNode;
  }
}

export default new Engine();


// class Engine {
//   constructor(){
//     this.appRoot = null;
//     this.tree = null;
//     this.clicks = -1;
//   }

//   // init(template, appRoot) {
//   //   this.appRoot = appRoot;
//   //   this.render(template, appRoot);
//   // }

//   // walk entire tree starting at top
//   // if diff is found, re-render that node
//     // from parent, set innerHTML to '' and append all children
//   // recursively check all child nodes until each is re-rendered or left alone

//   // getDiff(next, prev) {
//   //   // if (prev) 
//   //   const prevTree = prev || this.tree;
//   //   if (!prev) return false;

//   //   const { tag: prevTag, attr: prevAttr, children: prevChildren } = prev;
//   //   const { tag: nextTag, attr: nextAttr, children: nextChildren } = next;

//   //   // tag changed, update
//   //   if (prevTag !== nextTag) return true;

//   //   // skipping attributes for now

//   //   // children
//   //   const prevChildrenIsArray = prevChildren && prevChildren.map;
//   //   const nextChildrenIsArray = nextChildren && nextChildren.map;
//   //   if (prevChildrenIsArray !== nextChildrenIsArray) {
//   //     return true;
//   //   }

//   //   if (prevChildren.length !== nextChildren.length) {
//   //     return true;
//   //   }
//   // }

//   // render(tree) {
//   //   const {
//   //     tag = 'div',
//   //     attr = false,
//   //     element,
//   //     children,
//   //     root = true,
//   //     parent = this.appRoot
//   //   } = tree;

//   //   const isDiff = this.getDiff(tree);
//   //   console.log(isDiff);

//   //   // if there is a value for children
//   //   if (![false, null, undefined].includes(children)) {

//   //     // recursively render children into nodes and append to parent
//   //     if (children.map) {
//   //       children.forEach((child) => {
//   //         this.render({ ...child, root: false, parent: element });
//   //       });
//   //     } else {
//   //       element.innerHTML = children.toString();
//   //     }
//   //   }

//   //   parent.appendChild(element);

//   //   // cache tree from root
//   //   if (root) this.tree = tree;
//   // };
// };

// export default new Engine();
