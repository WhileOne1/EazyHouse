import React from 'react';
import { Link } from "react-router-dom";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import KitchenIcon from '@material-ui/icons/Kitchen';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';

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
				<CompareArrowsIcon/>
				<Link style={navStyle} target="_blank" to="/devices/switch">Przełącznik</Link>
            </li>
            <li>
				<WbSunnyIcon/>
				<Link style={navStyle} target="_blank" to="/devices/thermometer">Termometr</Link>
            </li>
            <li> 
				<KitchenIcon/>
				<Link style={navStyle} target="_blank" to="/devices/fridge">Lodówka</Link>
            </li>
            <li> 
				<EmojiObjectsIcon/>
				<Link style={navStyle} target="_blank" to="/devices/swiatlo">Światło</Link>
            </li>
            <li>
				<MeetingRoomIcon/>
				<Link style={navStyle} target="_blank" to="/devices/door">Drzwi</Link>
            </li>
            <li>
				<KitchenIcon/>
				<Link style={navStyle} target="_blank" to="/devices/freezer">Zamrażarka</Link>
            </li>
            <li>
				<WbSunnyIcon/>
				<Link style={navStyle} target="_blank" to="/devices/newthermometer">Termometr zewnętrzny</Link>
            </li>
            <li>
				<CompareArrowsIcon/>
				<Link style={navStyle} target="_blank" to="/devices/newswitch">Nowe urządzenie typu switch</Link>
            </li>
            <li>
				<NetworkCheckIcon/>
				<Link style={navStyle} target="_blank" to="/devices/pressure">Ciśnieniomierz</Link>
            </li>
            <li>
				<AcUnitIcon/>
				<Link style={navStyle} target="_blank" to="/devices/airconditioning">Klimatyzacja</Link>
            </li>
            
            
          </ul>
        </nav>

        
    );
};
export default device;