import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'src/firebase/';

const requireLogin = (nextState, replace, next) => {
	if (!firebase.auth().currentUser) {
		replace('/');
	}
	next();
};

const redirectIfLoggedIn = (nextState, replace, next) => {
	if (firebase.auth().currentUser) {
		replace('/todos');
	}
	next();
};

export default (
	<Router history={hashHistory}>
		<Route path="/">
			<Route path="todos" component={TodoApp} onEnter={requireLogin}/>
			<IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
		</Route>
	</Router>
);