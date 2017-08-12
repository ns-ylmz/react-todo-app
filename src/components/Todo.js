import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export class Todo extends Component {
	render() {
		let { id, text, completed, createdAt, completedAt, dispatch } = this.props;
		let todoClassName = completed ? 'todo todo-completed' : 'todo';
		let renderDate = () => {
			let message = 'Created ';
			let timestamp = createdAt;

			if (completed) {
				message = 'Completed ';
				timestamp = completedAt;
			}

			return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');	
		};

		return (
			<div className={todoClassName} onClick={() => { dispatch(actions.startToggleTodo(id, !completed)); }}>
				<div>
					<input type="checkbox" checked={completed}/>		
				</div>
				
				<div>
					<p>{ text }</p>
					<p className="todo__subtext">{ renderDate() }</p>
				</div>
			</div>
		);
	}
}

export default connect()(Todo);