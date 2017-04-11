import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, Middleware, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import createSagaMiddeware  from 'redux-saga';
import reduxLogger from 'redux-logger';

import reducer from '../reducer/calendar';
import saga from '../saga/calendar';
import LoginApp from '../view/calendar';

const sagaMiddleware = createSagaMiddeware();

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(reduxLogger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

sagaMiddleware.run(saga);

const AppContainer = connect(v => v)(LoginApp);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('mount')
)

