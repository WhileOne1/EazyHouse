import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import thermometer from './views/devices/thermometer';
import home from './views/home/home';


export default class App extends Component {
    render() {
        return (
            <>
            <BrowserRouter>
            <Switch>
                <Route path="/devices" component={thermometer} />
                <Route path="/" component={home} />
            </Switch>
            </BrowserRouter>
            
        </>
        );
    }
}