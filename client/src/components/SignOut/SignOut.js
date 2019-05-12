import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  };

  async componentDidMount() {
    await this.props.signOut();
    await this.props.history.push('/signup');
  };

  render() {
    return null;
  };
};

export default connect(null, actions)(SignOut);