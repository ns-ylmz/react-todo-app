import $ from 'jquery';

export const filterTodos = (todos, showCompleted, searchText) => {
	let filteredTodos = todos;

	filteredTodos = filteredTodos.filter(todo => {
		return !todo.completed || showCompleted; 
	});

	filteredTodos = filteredTodos.filter(todo => {
		return searchText.length === 0 || todo.text.toLowerCase().indexOf(searchText) > -1;
	});

	filteredTodos.sort((a, b) => {
		if (a.completed && b.completed) {
			return -1;
		} else if (a.completed && !b.completed) {
			return 1;
		} else {
			return 0;
		}
	});

	return filteredTodos;
};