import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';

import router from 'src/router/';
import * as actions from 'actions';
import { configure } from 'configureStore';
import firebase from 'src/firebase/';

const store = configure();

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(actions.login(user.uid));
		store.dispatch(actions.startAddTodos());
		hashHistory.push('/todos');
	} else {
		store.dispatch(actions.logout());
		hashHistory.push('/');
	}
});

// Load foundation
import 'foundation-sites/dist/css/foundation-float.min.css';
$(document).foundation();

// App css
import 'applicationStyles';

render(
	<Provider store={store}>
		{router}
	</Provider>,
	document.getElementById('app')
);