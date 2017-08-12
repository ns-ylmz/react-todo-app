import React from 'react';
import ReactDOM from 'react-dom'; 
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import expect from 'expect';
import $ from 'jquery';

import { configure } from 'configureStore';
import TodoApp from 'TodoApp';
import TodoList from 'TodoList';

describe('TodoApp', () => {
	it('should exist', () => {
		expect(TodoApp).toExist();
	});

	it('should render TodoList', () => {
		let store = configure();
		let provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<TodoApp/>
			</Provider>
		);

		let todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
		let todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

		expect(todoList.length).toEqual(1);
	});
});