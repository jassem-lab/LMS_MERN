import React, { Component } from 'react';

class Main extends Component {
  componentDidMount = () => {
    this.props.updateCurrentRouteTitle('Dashboard');
  };

  render = () => {
    return <div>Hello world</div>;
  };
}

export default Main;
