import expect from 'expect';
import df from 'deep-freeze-strict';

import * as reducers from 'reducers';

describe('Reducers', () => {
	describe('searchTextReducer', () => {
		it('should set searchText', () => {
			let action = {
				type: 'SET_SEARCH_TEXT',
				data: 'dog'
			};

			let res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.data);
		});
	});

	describe('showCompletedReducer', () => {
		it('should toggle showCompleted', () => {
			let action = {
				type: 'TOGGLE_SHOW_COMPLETED'
			};

			let res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	});

	describe('todosReducer', () => {
		it('should add new todo', () => {
			let action = {
				type: 'ADD_TODO',
				data: {
					id: 'abc123',
					text: 'Walk the dog',
					completed: false,
					createdAt: 92332323
				}
			};

			let res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.data);		
		});

		it('should update todo', () => {
			let todos = [{
				id: '123',
				text: 'Something',
				completed: true,
				createdAt: 123,
				completedAt: 125
			}];

			let updates = {
				completed: false,
				completedAt: null
			};

			let action = {
				type: 'UPDATE_TODO',
				data: {
					id: todos[0].id,
					updates
				}
			};

			let res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toEqual(updates.completed);
			expect(res[0].completedAt).toEqual(updates.completedAt);
			expect(res[0].text).toEqual(todos[0].text);
		});

		it('should add existing todos', () => {
			let todos = [{
				id: '123',
				text: 'something',
				completed: false,
				completedAt: undefined,
				createdAt: 33000
			}];

			let action = {
				type: 'ADD_TODOS',
				data: { 
					todos
				}
			};

			let res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});

		describe('authReducer', () => {
			it('should store uid on LOGIN', () => {
				let action = {
					type: 'LOGIN',
					data: 'abc123'
				};

				let res = reducers.authReducer(undefined, df(action));

				expect(res).toEqual({
					uid: action.data
				});
			});

			it('should wipe out on LOGOUT', () => {
				let authData = {
					uid: '123abc'
				};

				let action = {
					type: 'LOGOUT'
				};

				let res = reducers.authReducer(df(authData), df(action));

				expect(res).toEqual({});
			});
		});

	});
});