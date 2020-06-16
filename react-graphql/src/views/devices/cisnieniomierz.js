import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
/* function Random(props) {
    const maxNumber = 35;
    const randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    return randomNumber;
  } */
const val = 67156
const deviceid = parseInt(val)
const type = 'thermometer'



const MainThermometer = () => {
    const [value, setValue] = useState(990);
    const socket = socketIOClient('http://localhost:2000')




    useEffect(() => {
        const messageContainer = document.getElementById('message-container')

        
        socket.emit('check-id', {deviceid})

        socket.on('new-id', deviceid => {
            socket.emit('add-device', { deviceid,type })
        })

        socket.on('old-id', deviceid => {
            
            socket.emit('old-device',  deviceid )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        setTimeout(() => { socket.emit('send-thermometer-value', {deviceid, value}) }, 1000);

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }

      }, []);
      useEffect(() => {
        socket.emit('send-thermometer-value', {deviceid, value})
  
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
           <Thermometer
            theme="light"
            value={value}
            max="100"
            steps="3"
            format="hPa"
            size="large"
            height="300"
            /> 
            </div>
            <div style={thermostyle}>
            <button onClick={() => setValue(value + 1)}>
            zwiększ ciśnienie
            </button>
            <button onClick={() => setValue(value - 1)}>
            zmiejsz ciśnienie
            </button>
            </div>

        
        <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default MainThermometer;