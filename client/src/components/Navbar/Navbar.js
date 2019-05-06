import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Navbar extends Component {

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper row">
						<Link to="/" className="brand-logo home-nav-link col left">Calculator</Link>
						<ul id="nav-mobile" className="right">
							<li><Link to="/login">Login</Link></li>
							<li><Link to="/logout">Logout</Link></li>
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