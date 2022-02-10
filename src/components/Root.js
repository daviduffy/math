import Style from '../scss/index.scss';
import { h } from '../engine/engine';

class Component {
  constructor(rootId) {
    this.state = {
      planet: 'Mars',
    }

    this.root = document.getElementById(rootId);
    this.app = 'window.App';
  }

  handleClick() {
    console.log('click');
  }

  template() {
    // const el = h('div', { class: 'container'},
    //   h('p', null, 'I am some text')
    // );
    // console.log(el);
    return h('button', { onclick: this.handleClick }, 'click me');
  }

  render() {
    this.root.innerHTML = '';
    this.root.appendChild(this.template());
  }
}

export default Component;
