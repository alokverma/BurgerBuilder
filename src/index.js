import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore,applyMiddleware,compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerBuilder from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose

const reducers = combineReducers({
    burgerBuilder: burgerBuilder,
    orderReducer: orderReducer,
    authReducer:authReducer
})

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
