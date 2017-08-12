import React from 'react';
import ReactDOM from 'react-dom'; 
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import $ from 'jquery';

import { AddTodo } from 'AddTodo';
import * as actions from 'actions';

describe('AddTodo', () => {
	it('should exist', () => {
		expect(AddTodo).toExist();
	});

	it('should dispatch ADD_TODO when valid text', () => {
		let todoText = 'Check mail';
		let action = actions.startAddTodo(todoText);

		let spy = expect.createSpy();
		let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
		let $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(action);
	});

	it('should not dispatch ADD_TODO when invalid todo text', () => {
		let todoText = '';
		let spy = expect.createSpy();
		let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
		let $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});

});