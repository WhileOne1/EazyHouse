import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css"
const socket = socketIOClient('http://localhost:2000')
class Header extends Component  {
    socket = socketIOClient('http://localhost:2000')
    render()
    {
        return (
      
        <header className="Header">
        <nav className="Nav">
          <ul className="NavClass">
            <li>
              <NavLink exact to="/">
                Place Order
              </NavLink>
            </li>
            <li>
              <NavLink to="/">Change Predicted </NavLink>
            </li>
            <li>
              <NavLink to="/"> Kitchen </NavLink>
            </li  >
          </ul>
        </nav>
      </header>
      
    );}
  };
  
  export   { Header  ,socket};