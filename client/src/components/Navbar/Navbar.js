import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this)
  }

  async signOut(){
    await this.props.signOut();
  }

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper widget-navbar #424242 grey darken-3 row">
						<Link to="/" className="brand-logo home-nav-link col left">Widget Calculator</Link>
						<ul id="nav-mobile" className="right">
							<li><Link to="/signin">Sign In</Link></li>
							<li><Link to="/signup">Sign Up</Link></li>
							<li><Link to="/signout" onClick={this.signOut}>Sign Out</Link></li>
							<li><Link to="/profile">Profile</Link></li>
              <li><Link to="/database">Database</Link></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default connect(null, actions)(Navbar)