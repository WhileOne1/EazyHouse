import React from 'react';
import { NavLink } from "react-router-dom";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import KitchenIcon from '@material-ui/icons/Kitchen';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

const device = () => {
     const navStyle = {
             color: 'white' ,
             listStyleType: 'none',
             textDecoration: 'none'
     }
    return (
        
        
        <nav className="Nav">
          <ul className="NavClass">
            <li style={navStyle}>
              <CompareArrowsIcon/>
              <NavLink style={navStyle} to="/devices/switch">Włącznik</NavLink>
            </li>
			      <li style={navStyle}>
              <CompareArrowsIcon/>
              <NavLink style={navStyle} to="/devices/switch1">Włącznik 2</NavLink>
            </li>
            <li style={navStyle}>
              <WhatshotIcon/>
              <NavLink style={navStyle} to="/devices/thermometer">Termometr</NavLink>
            </li>
            <li style={navStyle}>
              <KitchenIcon/>
              <NavLink style={navStyle} to="/devices/fridge">Lodówka</NavLink>
            </li>
			      <li style={navStyle}>
              <EmojiObjectsIcon/>
              <NavLink style={navStyle} to="/devices/swiatlo">Światło</NavLink>
            </li>
          </ul>
        </nav>

        
    );
};
export default device;