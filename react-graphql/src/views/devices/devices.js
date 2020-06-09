import React from 'react';
import { NavLink } from "react-router-dom";

const device = () => {
    const navStyle = {
       color: 'white' 
    }
    return (
        
        
        <nav className="Nav">
          <ul className="NavClass">
            <li>
              <NavLink style={navStyle} to="/devices/switch">Włącznik</NavLink>
            </li>
			<li>
              <NavLink style={navStyle} to="/devices/switch1">Włącznik 2</NavLink>
            </li>
            <li>
              <NavLink style={navStyle} to="/devices/thermometer">Termometr</NavLink>
            </li>
            <li>
              <NavLink style={navStyle} to="/devices/fridge">Lodówka</NavLink>
            </li>
			<li>
              <NavLink style={navStyle} to="/devices/swiatlo">Światło</NavLink>
            </li>
          </ul>
        </nav>

        
    );
};
export default device;