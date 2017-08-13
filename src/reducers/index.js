import uuid from 'uuid';
import moment from 'moment';

export const searchTextReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_SEARCH_TEXT':
			return action.data;
		default:
			return state;
	};
};

export const showCompletedReducer = (state = false, action) => {
	switch (action.type) {
		case 'TOGGLE_SHOW_COMPLETED':
			return !state;
		default:
			return state;
	};
};

export const todosReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				action.data
			];
		case 'UPDATE_TODO':
			return state.map(todo => {
				if (todo.id === action.data.id) {
					return {
						...todo,
						...action.data.updates
					};
				} else {
					return todo;
				}
			});
		case 'ADD_TODOS':
			return [
				...state,
				...action.data.todos
			];
		case 'LOGOUT':
			return [];
		default:
			return state;
	};
};

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.data
			};
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
};