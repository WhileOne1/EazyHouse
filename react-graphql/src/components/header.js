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
      if (localStorage.getItem("token") === null) return (
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
          </ul>

        </nav >
        </header>
          );
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
            <li>
              <NavLink style={navStyle} to="/register">Dodaj Użytkowników </NavLink>
            </li  >
            <li>
            <NavLink style={navStyle} onClick={function(){localStorage.clear(); window.location.reload();}} to="/login">Wyloguj </NavLink>
            
            </li>
            </ul>

        </nav >
      </header>
      
    );}
  };
  
  export   { Header  ,socket};