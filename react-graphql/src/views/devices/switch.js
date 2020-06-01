import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
import SwitchComponent from '../../components/switchComponent'
const val = 2
const id = parseInt(val)
const type = 'switch'



const MainSwitch = () => {
    const [value, setValue] = useState(false);
    const socket = socketIOClient('http://localhost:2000')

    useEffect(() => {
        const messageContainer = document.getElementById('message-container')

        
        socket.emit('check-id', {id,type})

        socket.on('new-id', id => {
            socket.emit('add-switch', { id, value })
        })

        socket.on('old-id', id => {
            
            socket.emit('old-switch',  id )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        socket.emit('send-switch-value', {id, value})

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }

      }, []);
      useEffect(() => {
        socket.emit('send-switch-value', {id, value})
  
      },[value])
      
      const thermostyle = {
        padding: "20px",
        margin: "0 auto",
        textAlign: "center",
        width: "10%"
      };
      const infostyle = {
        padding: "20px",
        textAlign: "center",
      };
    return (
        <div >
            <div style={thermostyle}>
            <SwitchComponent  isItOn={value}
             handleToggle={() => setValue(!value)}/>
             {value}
            </div>
            <div style={thermostyle}>

            </div>

        
        <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default MainSwitch;