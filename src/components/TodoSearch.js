import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

export class TodoSearch extends Component {
	render() {
		let { dispatch, showCompleted, searchText } = this.props; 
		
		return (
			<div className="container__header">
				<div>
					<input type="search" ref="searchText" value={searchText} placeholder="Search todos" onChange={() => { 
						let searchText = this.refs.searchText.value;
						dispatch(actions.setSearchText(searchText));
					}}/>
				</div>
				<div>
					<label>
						<input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={() => {dispatch(actions.toggleShowCompleted())}}/>
						Show completed todos
					</label>	
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			showCompleted: state.showCompleted,
			searchText: state.searchText
		};
	}
)(TodoSearch);