import { h, render, createElement, updateElement } from '../engine/engine';
import Component from '../engine/Component';
import Style from '../scss/index.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      planet: 'Mars',
      count: 0,
    }
    this.$root = null;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, delta) {
    const newCount = this.state.count + delta;
    this.setState({ count: newCount });
    this.render();
  }

  template() {
    return h('div', { class: 'container' },
      h('p', {}, (this.state.count).toString()),
      h('button', { onclick: (e) => this.handleClick(e, 1) }, '+'),
      h('button', { onclick: (e) => this.handleClick(e, -1) }, '-')
    );
  }

  start($root) {
    this.$root = $root;
    this.$vdom = this.template();
    updateElement(this.$root, this.template());
    // console.log(createElement(this.template()));
  }

  render() {
    const newNode = this.template();
    const oldNode = this.$vdom;
    updateElement(this.$root, newNode, oldNode);
    this.$vdom = newNode;
  }
}

export default App;
