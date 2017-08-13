import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';

import * as actions from 'actions';
import firebase, { firebaseRef } from 'src/firebase';

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
	it('should generate search text action', () => {
		let action = {
			type: 'SET_SEARCH_TEXT',
			data: 'Some search text'
		};

		let res = actions.setSearchText(action.data);

		expect(res).toEqual(action);
	});

	it('should generate toggle show completed action', () => {
		let action = {
			type: 'TOGGLE_SHOW_COMPLETED'
		};

		let res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it('should generate add todo action', () => {
		let action = {
			type: 'ADD_TODO',
			data: {
				id: '123asd',
				text: 'Anything we like',
				completed: false,
				createdAt: 0
			}
		};

		let res = actions.addTodo(action.data);

		expect(res).toEqual(action);
	});

	it('should create todo and dispatch ADD_TODO', (done) => {
		const store = createMockStore({});
		const todoText = 'My todo item';

		store.dispatch(actions.startAddTodo(todoText))
			.then(() => {
				const actions = store.getActions();
				expect(actions[0]).toInclude({
					type: 'ADD_TODO'
				});	
				expect(actions[0].data).toInclude({
					text: todoText
				});
				done();
			})
			.catch(done);
	});

	it('should generate add todos action object', () => {
		let todos = [{
			id: '111',
			text: 'anything',
			completed: false,
			completedAt: undefined,
			createdAt: 33000
		}];

		let action = {
			type: 'ADD_TODOS',
			data: { todos }
		};

		let res = actions.addTodos(todos);

		expect(res).toEqual(action);
	});

	it('should generate update todo action', () => {
		let action = {
			type: 'UPDATE_TODO',
			data: {
				id: '123',
				updates: {
					completed: false
				}
			}
		};

		let res = actions.updateTodo(action.data.id, action.data.updates);

		expect(res).toEqual(action);
	});

	it('should generate login action object', () => {
		let action = {
			type: 'LOGIN',
			data: '123abc'
		};

		let res = actions.login(action.data);

		expect(res).toEqual(action);
	});

	it('should generate logout action object', () => {
		let action = {
			type: 'LOGOUT'
		};

		let res = actions.logout();

		expect(res).toEqual(action);
	});

	describe('Tests with firebase todos', () => {
		let testTodoRef;

		beforeEach((done) => {
			let todosRef = firebaseRef.child('todos');

			todosRef.remove()
				.then(() => {
					testTodoRef = firebaseRef.child('todos').push();

					return testTodoRef.set({
						text: 'Something to do',
						completed: false,
						createdAt: 23423423
					});			
				})
				.then(() => done())
				.catch(done);
		});

		afterEach((done) => {
			testTodoRef.remove()
				.then(() => done());
		});

		it('should toggle todo and dispatch UPDATE_TODO action', done => {
			let store = createMockStore({});
			let action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action)
				.then(() => {
					let mockActions = store.getActions();

					expect(mockActions[0]).toInclude({
						type: 'UPDATE_TODO',
						data: {
							id: testTodoRef.key
						}
					});
					expect(mockActions[0].data.updates).toInclude({
						completed: true
					});
					expect(mockActions[0].data.updates.completedAt).toExist();
					done();
				})
				.catch(done);
		});

		it('should populate todos and dispatch ADD_TODOS', (done) => {
			let store = createMockStore({});

			let action = actions.startAddTodos();

			store.dispatch(action)
				.then(() => {
					let mockActions = store.getActions();

					expect(mockActions[0].type).toEqual('ADD_TODOS');
					expect(mockActions[0].data.todos.length).toEqual(1);
					expect(mockActions[0].data.todos[0].text).toEqual('Something to do');
					done();
				})
				.catch(done);
		});

	});
});