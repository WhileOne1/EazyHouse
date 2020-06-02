import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import thermometer from './views/devices/thermometer';
import switch1 from './views/devices/switch';
import  {Header} from "./components/header";
import home from './views/home/home';


export default class App extends Component {
    render() {
        return (
            <>
            
            <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/devices/thermometer" component={thermometer} />
                <Route path="/devices/switch" component={switch1} />

                <Route path="/" component={home} />
            </Switch>
            </BrowserRouter>
            
        </>
        );
    }
}