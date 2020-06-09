import React from 'react';
import { Link } from "react-router-dom";

const device = () => {
    const navStyle = {
       color: 'white' ,
       textDecoration: 'none',
    }
    return (
        
        
        <nav className="Nav">
          <ul className="NavClass">
            <li>
              <Link style={navStyle} target="_blank" to="/devices/switch">switch </Link>
            </li>
            <li>
              <Link style={navStyle} target="_blank" to="/devices/thermometer">termometr </Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/fridge">fridge </Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/switch2">switch 2 </Link>
            </li  >
          </ul>
        </nav>

        
    );
};
export default device;