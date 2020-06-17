import React from 'react';
import { Link } from "react-router-dom";



const device = () => {
    const navStyle = {
       color: 'white' ,
       listStyleType: 'none',
       textDecoration: 'none',
    }
    return (
        
        
        <nav className="Nav">
          <ul className="NavClass">
            <li>
              <Link style={navStyle} target="_blank" to="/devices/switch">Przełącznik </Link>
            </li>
            <li>
              <Link style={navStyle} target="_blank" to="/devices/thermometer">Termometr </Link>
            </li  >
            <li> 
              <Link style={navStyle} target="_blank" to="/devices/fridge">Lodówka </Link>
            </li  >
            <li> 
              <Link style={navStyle} target="_blank" to="/devices/swiatlo">Światło </Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/door">Drzwi</Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/freezer">Zamrażarka</Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/newthermometer">Termometr zewnętrzny</Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/newswitch">Nowe urządzenie typu switch</Link>
            </li  >
            <li>
              <Link style={navStyle} target="_blank" to="/devices/pressure">Ciśnieniomierz</Link>
            </li  >
            <li>
            <Link style={navStyle} target="_blank" to="/devices/airconditioning">Klimatyzacja</Link>
            </li  >
            
            
          </ul>
        </nav>

        
    );
};
export default device;