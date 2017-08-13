import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import moment from 'moment';

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from  'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends Component {
	onLogout(e) {
		e.preventDefault();

		let { dispatch } = this.props;

		dispatch(actions.startLogout());
	}

	render() {
		return (
			<div>
				<div className="page-actions">
					<a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
				</div>

				<h1 className="page-title">Todo App</h1>

				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
							<TodoSearch/>
							<TodoList/>
							<AddTodo/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect()(TodoApp);