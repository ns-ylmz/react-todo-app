import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

export class Login extends Component {
	onClick() {
		let { dispatch } = this.props;

		dispatch(actions.startLogin());
	}

	render() { 
		return (
			<div>
				<h1 className="page-title">Todo App</h1>	

				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<div className="callout callout-auth">
							<h3>Login</h3>

							<p>
								Login with Github account below.
							</p>

							<button className="button" onClick={this.onClick.bind(this)}>Login With Github</button>
						</div>						
					</div>
				</div>
			</div>
		);
	}
}

export default connect()(Login);