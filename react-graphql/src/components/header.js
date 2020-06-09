import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css"
const socket = socketIOClient('http://localhost:2000')
const navStyle = {
  color: 'white' ,
  textDecoration: 'none',
}
class Header extends Component  {
    socket = socketIOClient('http://localhost:2000')
    
    render()
    {
        return (
      
        <header className="Header">
        <nav className="Nav">
          <h1>EazyHouse</h1>
          <ul className="Nav-Links">
            <li>
              <NavLink style={navStyle} to="/">Strona Główna </NavLink>
            </li>
            <li>
              <NavLink style={navStyle} to="/rooms">Pokoje </NavLink>
            </li  >
            <li>
              <NavLink style={navStyle} to="/devices">Urządzenia </NavLink>
            </li  >



{/*           <li className="Log-Links">
              <NavLink style={navStyle} to="/login">Logowanie </NavLink>
              </li  >
              <li >
              <NavLink style={navStyle} to="/register">Rejestracja </NavLink>
            </li  > */}
            </ul>

        </nav >
      </header>
      
    );}
  };
  
  export   { Header  ,socket};