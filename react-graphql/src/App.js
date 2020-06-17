import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import thermometer from './views/devices/thermometer';
import switch1 from './views/devices/switch';
import fridge from './views/devices/fridge';
import Door from './views/devices/drzwi';
import Gate from './views/devices/brama';
import  {Header} from "./components/header";
import home from './views/home/home';
import Rooms from './views/rooms/Rooms';
import device from './views/devices/devices';
import swiatlo from './views/devices/swiatlo';
import register from './views/register/Register';
import login from './views/login/Login';
import {AuthContext} from './context/auth';
import PrivateRoute from './PrivateRoute';
import { useLocalStorage } from '@rehooks/local-storage';
import Freezer from './views/devices/zamrazarka';
import Thermo from './views/devices/termometrZewnetrzny';
import NewSwitch from './views/devices/nowyswitch';
import AirConditioning from './views/devices/switchwithvalue';
import Pressure from './views/devices/cisnieniomierz';

function App(props) {
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
                <PrivateRoute path="/devices/gate" component={Gate} />
                <PrivateRoute path="/devices/door" component={Door} />
                <PrivateRoute path="/devices/freezer" component={Freezer} />
                <PrivateRoute path="/devices/newthermometer" component={Thermo} />
                <PrivateRoute path="/devices/newswitch" component={NewSwitch} />
                <PrivateRoute path="/devices/pressure" component={Pressure} />
                <PrivateRoute path="/devices/airconditioning" component={AirConditioning} />
                <PrivateRoute path="/devices" component={device} />
                <PrivateRoute path="/rooms" component={Rooms} />
                <PrivateRoute path="/register" component={register} />
                <Route path="/login" component={login} />
                <PrivateRoute path="/" component={home} />
            </Switch>
            </BrowserRouter>
            </AuthContext.Provider>
        );
    
}
export default App;