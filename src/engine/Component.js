class Component {
  constructor(props) {
    this.setState = this.setState.bind(this);
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }
}

export default Component;
