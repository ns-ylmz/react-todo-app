import expect from 'expect';

import * as TodoAPI from 'TodoAPI';

describe('TodoAPI', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(TodoAPI).toExist();
	});

	describe('filterTodos', () => {
		let todos = [{
			id: 1,
			text: 'Some text here',
			completed: true
		},{
			id: 2,
			text: 'Other text here',
			completed: false
		}, {
			id: 3,
			text: 'Some text here',
			completed: true
		}];

		it('should return all items if showCompleted is true', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos.length).toBe(todos.length);
		});

		it('should return non-completed todos when showCompleted is false', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, false, '');
		
			expect(filteredTodos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos[0].completed).toBe(false);
		});

		it('should filter todos by searchText', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, 'some');

			expect(filteredTodos.length).toBe(2);
		});

		it('should return all todos if searchText is empty', () => {
			let filteredTodos = TodoAPI.filterTodos(todos, true, '');

			expect(filteredTodos.length).toBe(3);
		});

	});

});