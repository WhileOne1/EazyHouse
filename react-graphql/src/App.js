import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import thermometer from './views/devices/thermometer';
import switch1 from './views/devices/switch';
import fridge from './views/devices/fridge';
import  {Header} from "./components/header";
import home from './views/home/home';
import Rooms from './views/rooms/Rooms';
import device from './views/devices/devices';
import swiatlo from './views/devices/swiatlo';
import register from './views/register/Register';
import login from './views/login/Login';
import Switch2 from './views/devices/switch';
import {AuthContext} from './context/auth';
import PrivateRoute from './PrivateRoute';
import { useLocalStorage } from '@rehooks/local-storage';


function App(props) {
/*         useEffect(() => {
            setAuthTokens(localStorage.getItem("token"));
        },[localStorage.getItem("token")]) */
       const [token] = useLocalStorage("token")
        const [authTokens, setAuthTokens] = useState(token);
        console.log(authTokens);
        const setTokens = (data) => {
            localStorage.setItem("token",JSON.stringify(data));
            setAuthTokens(data);
        }
        return (
            <AuthContext.Provider value= {{authTokens, setAuthTokens: setTokens}}>
            
            <BrowserRouter>
            <Header />
            <Switch>
                <PrivateRoute path="/devices/thermometer" component={thermometer} />
                <PrivateRoute path="/devices/switch" component={switch1} />
                <PrivateRoute path="/devices/fridge" component={fridge} />
                <PrivateRoute path="/devices/swiatlo" component={swiatlo} />
                <PrivateRoute path="/devices" component={device} />
                <PrivateRoute path="/rooms" component={Rooms} />
                <PrivateRoute path="/register" component={register} />
                <Route path="/login" component={login} />
                <PrivateRoute path="/devices/switch2" component={Switch2} />
                <PrivateRoute path="/" component={home} />
            </Switch>
            </BrowserRouter>
            </AuthContext.Provider>
        
        );
    
}
export default App;
/* export default class App extends Component {

    render() {
        const existingTokens = JSON.parse(localStorage.getItem("tokens"));
        const [authTokens, setAuthTokens] = useState(existingTokens);
        const setTokens = (data) => {
            localStorage.setItem("tokens",JSON.stringify(data));
            setAuthTokens(data);
        }
        return (
            <AuthContext.Provider value= {false}>
            
            <BrowserRouter>
            <Header />
            <Switch>
                <PrivateRoute path="/devices/thermometer" component={thermometer} />
                <PrivateRoute path="/devices/switch" component={switch1} />
                <PrivateRoute path="/devices/fridge" component={fridge} />
                <PrivateRoute path="/devices/swiatlo" component={swiatlo} />
                <PrivateRoute path="/devices" component={device} />
                <PrivateRoute path="/rooms" component={Rooms} />
                <PrivateRoute path="/register" component={register} />
                <Route path="/login" component={login} />
                <PrivateRoute path="/devices/switch2" component={Switch2} />
                <Route path="/" component={home} />
            </Switch>
            </BrowserRouter>
            </AuthContext.Provider>
        
        );
    }
} */