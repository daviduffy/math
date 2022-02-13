/** @jsx Engine.h */

import Engine from '../engine/engine';
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
    return (
      <div class="container">
        <p>{ this.state.count }</p>
        <button onclick={(e) => this.handleClick(e, 1)}>+</button>
        <button onclick={(e) => this.handleClick(e, -1)}>-</button>
      </div>
    );
  }

  render() {
    Engine.render(this.template());
  }
}

export default App;
