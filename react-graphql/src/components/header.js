import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css"
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
const socket = socketIOClient('http://localhost:2000')


const navStyle = {
  color: 'white' ,
  listStyleType: 'none',
  textDecoration: 'none'
}

class Header extends Component  {
    socket = socketIOClient('http://localhost:2000');  
    render()
    {
        return (
      
        <header className="Header">
        <nav className="Nav">
          <h3>EazyHouse</h3>
          <ul className="Nav-Links">
            <li>
              <DeviceHubIcon/>
              <NavLink style={navStyle} to="/">Wszystkie urządzenia</NavLink>
            </li>
            <li>
              <DevicesIcon/>
              <NavLink style={navStyle} to="/devices">Symulowanie urządzeń</NavLink>
            </li>
            <li>
              <HomeIcon/>
              <NavLink style={navStyle} to="/rooms">Pokoje</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      
    );}
  };
  
  export   { Header  ,socket};