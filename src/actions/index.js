import moment from 'moment';

import firebase, { firebaseRef } from 'src/firebase/';
import {
	ADD_TODO,
	ADD_TODOS,
	SET_SEARCH_TEXT,
	TOGGLE_SHOW_COMPLETED,
	UPDATE_TODO
} from './types';

export const setSearchText = (searchText) => {
	return {
		type: SET_SEARCH_TEXT,
		data: searchText
	};
};

export const toggleShowCompleted = () => {
	return {
		type: TOGGLE_SHOW_COMPLETED
	};
};

export const addTodo = (todo) => {
	return {
		type: ADD_TODO,
		data: todo
	};
};

export const startAddTodo = (text) => {
	return (dispatch, getState) => {
		let todo = {
			text,
			completed: false,
			createdAt: moment().unix(),
			completedAt: null
		};

		let todoRef = firebaseRef.child('todos').push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id: todoRef.key
			}));
		});
	};
};

export const startAddTodos = () => {
	return (dispatch, getState) => {
		let todosRef = firebaseRef.child('todos');

		return todosRef.once('value')
			.then((snapshot) => {
				let todos = snapshot.val() || {};
				let parsedTodos = [];

				Object.keys(todos).forEach((todoId) => {
					parsedTodos.push({
						id: todoId,
						...todos[todoId]
					});
				});

				dispatch(addTodos(parsedTodos));
			})
			.catch(e => console.log(e));		
	};
};

export const addTodos = (todos) => {
	return {
		type: ADD_TODOS,
		data: { todos }
	}
};

export const updateTodo = (id, updates) => {
	return {
		type: UPDATE_TODO,
		data: {
			id,
			updates
		}
	};
};

export const startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		let todoRef = firebaseRef.child(`todos/${id}`);
		let updates = {
			completed,
			completedAt: completed ? moment().unix() : null
		};

		return todoRef.update(updates)
			.then(() => {
				dispatch(updateTodo(id, updates));
			});	
	};
};