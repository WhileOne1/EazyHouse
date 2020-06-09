import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink(
    {
        uri: 'http://localhost:4000/'
    }
)
/* httpLink.request([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};
        }
        req.options.headers['x-token'] = localStorage.getItem('token');
        req.options.headers['x-refresh-token'] = localStorage.getItem('refreshtoken');
        next();
    }
}])
httpLink.useAfter([{
    applyAfterware({response: {headers}},next) {
        const token = headers.get('x-token')
        const refreshtoken = headers.get('x-refreshtoken-token')
        if(token) {
            localStorage.setItem('token',token);
        }
        if(refreshtoken) {
            localStorage.setItem('token',refreshtoken);
        }
        next();
    }
}]) */
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
