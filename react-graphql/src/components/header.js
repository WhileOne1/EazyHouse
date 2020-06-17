import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css"
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
import PeopleIcon from '@material-ui/icons/People';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const socket = socketIOClient('http://localhost:2000')
const navStyle = {
  color: 'white' ,
  textDecoration: 'none',
}
class Header extends Component  {
    socket = socketIOClient('http://localhost:2000')
    
    render()
    {
      if (localStorage.getItem("token") === null) return (
      <header className="Header">
      <nav className="Nav">
        <h1>EazyHouse</h1>
        <ul className="Nav-Links">
          <li>
			<HomeIcon/>
            <NavLink style={navStyle} to="/"> Strona Główna</NavLink>
          </li>
          <li>
			<DeviceHubIcon/>
            <NavLink style={navStyle} to="/rooms"> Pokoje</NavLink>
          </li>
          <li>
			<DevicesIcon/>
            <NavLink style={navStyle} to="/devices"> Symulator Urządzeń</NavLink>
          </li>
          </ul>

        </nav >
        </header>
          );
        return (
      
        <header className="Header">
        <nav className="Nav">
          <h1>EazyHouse</h1>
          <ul className="Nav-Links" >
            <li>
				<HomeIcon/>
              <NavLink style={navStyle} to="/"> Strona Główna</NavLink>
            </li>
            <li>
				<DeviceHubIcon/>
				<NavLink style={navStyle} to="/rooms"> Pokoje</NavLink>
            </li>
            <li>
				<DevicesIcon/>
				<NavLink style={navStyle} to="/devices"> Symulator Urządzeń</NavLink>
            </li>
            <li>
				<PeopleIcon/>
				<NavLink style={navStyle} to="/register"> Dodaj Użytkowników</NavLink>
            </li>
            <li>
				<PowerSettingsNewIcon/>
				<NavLink style={navStyle} onClick={function(){localStorage.clear(); window.location.reload();}} to="/login"> Wyloguj </NavLink>
            </li>
            </ul>

        </nav >
      </header>
      
    );}
  };
  
  export   { Header  ,socket};