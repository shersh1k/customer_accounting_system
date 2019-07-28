import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from './store';
import './style/Index.module.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker/serviceWorker';

ReactDOM.render((
    <Provider store={configureStore()}>
        <BrowserRouter>
            <Route exact path="/" component={App} />
            <div>asd</div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
