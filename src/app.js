import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import TodoApp from 'TodoApp';

import * as actions from 'actions';
import { configure } from 'configureStore';
import * as TodoAPI from 'TodoAPI';

const store = configure();

store.dispatch(actions.startAddTodos());

// Load foundation
import 'foundation-sites/dist/css/foundation-float.min.css';
$(document).foundation();

// App css
import 'applicationStyles';

render(
	<Provider store={store}>
		<TodoApp/>
	</Provider>,
	document.getElementById('app')
);