import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
function Random(props) {
    const maxNumber = 35;
    const randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    return randomNumber;
  }
const val = 2
const id = parseInt(val)




const MainThermometer = () => {
    const [value, setValue] = useState(21);
    const socket = socketIOClient('http://localhost:2000')




    const [response, setResponse] = useState("");
    useEffect(() => {
        const messageContainer = document.getElementById('message-container')

        
        socket.emit('check-id', id)

        socket.on('new-id', id => {
            socket.emit('add-thermometer', { id, value })
        })

        socket.on('old-id', id => {
            
            socket.emit('old-thermometer',  id )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        socket.emit('send-thermometer-value', {id, value})

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }

      }, []);
      useEffect(() => {
        socket.emit('send-thermometer-value', {id, value})
  
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
            format="°C"
            size="large"
            height="300"
            /> 
            </div>
            <div style={thermostyle}>
            <button onClick={() => setValue(value + 1)}>
            zwiększ temperaturę
            </button>
            <button onClick={() => setValue(value - 1)}>
            zmiejsz temperaturę
            </button>
            </div>

        
        <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default MainThermometer;