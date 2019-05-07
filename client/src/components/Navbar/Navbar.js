import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper #424242 grey darken-3 row">
						<Link to="/" className="brand-logo home-nav-link col left">Widget Calculator</Link>
						<ul id="nav-mobile" className="right">
							<li><Link to="/signin">Sign In</Link></li>
							<li><Link to="/signup">Sign Up</Link></li>
							<li><Link to="/signout">Sign Out</Link></li>
							<li><Link to="/profile">Profile</Link></li>
              <li><Link to="/database">Database</Link></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Navbar