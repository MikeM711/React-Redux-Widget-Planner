import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css'
import * as actions from '../../actions';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.signOut = this.signOut.bind(this)
	}

	async signOut() {
		await this.props.signOut();
	}

	render() {
		return (
			<div className="widget-navbar">
				<nav>
					
						<div className="nav-wrapper #424242 grey darken-3 row">
							<Link to="/" className="brand-logo home-nav-link col left">Widget Calculator</Link>
							<ul id="nav-mobile" className="right">

								{!this.props.isAuth ?
									([<li key="signin"><Link to="/signin">Sign In</Link></li>,
									<li key="signup"><Link to="/signup">Sign Up</Link></li>
									]) : null
								}

								{this.props.isAuth ?
									([<li key="signout"><Link to="/signout" onClick={this.signOut}>Sign Out</Link></li>,
									<li key="profile"><Link to="/profile">Profile</Link></li>,
									<li key="database"><Link to="/database">Database</Link></li>
									]) : null
								}

							</ul>
						</div>
				</nav>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuth: state.authRed.isAuthenticated
	}
}

export default connect(mapStateToProps, actions)(Navbar)