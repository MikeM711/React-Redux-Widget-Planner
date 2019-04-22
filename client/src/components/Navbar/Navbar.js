import React, { Component } from 'react'

class Navbar extends Component {

	render() {
		return (
			<div>
				<nav>
					<div className="nav-wrapper row">
						<a href="/" className="brand-logo home-nav-link col left">Calculator</a>
						<ul id="nav-mobile" className="right">
							<li><a href="/login">Login</a></li>
							<li><a href="/logout">Logout</a></li>
							<li><a href="/profile">Profile</a></li>
              <li><a href="/database">Database</a></li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default Navbar