import Engine from '../engine/engine';
import Component from '../engine/Component';
import Style from '../scss/index.scss';

const { h, render, createElement } = Engine;

class App extends Component {
  constructor() {
    super();
    this.state = {
      planet: 'Mars',
      count: 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, delta) {
    const newCount = this.state.count + delta;
    this.setState({ count: newCount });
    Engine.render(this.template());
  }

  template() {
    const template = createElement({
      tag: 'div',
      attr: { class: 'container' },
      children: [
        createElement({
          tag: 'p',
          children: this.state.count
        }),
        createElement({
          tag: 'button',
          attr: { onclick: (e) => this.handleClick(e, 1) },
          children: '+'
        }),
        createElement({
          tag: 'button',
          attr: { onclick: (e) => this.handleClick(e, -1) },
          children: '-'
        })
      ]
    });
    console.log(template);
    // const template = h('div', { class: 'container' }, 
      // h('p', null, 'I am some text'),
      // h('p', null, this.state.count),
      // h('button', { onclick: (e) => this.handleClick(e, 1) }, '+'),
      // h('button', { onclick: (e) => this.handleClick(e, -1) }, '-')
    // );
    return template;
  }
}

export default App;
