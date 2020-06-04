import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
const val = 7
const id = parseInt(val)
const type = 'fridge'



const MainFridge = () => {
    const [value, setValue] = useState(4);
    const socket = socketIOClient('http://localhost:2000')

    useEffect(() => {
        const messageContainer = document.getElementById('message-container')

        
        socket.emit('check-id', {id,type})

        socket.on('new-id', id => {
            socket.emit('add-fridge', { id, value })
        })

        socket.on('old-id', id => {
            
            socket.emit('old-fridge',  id )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        socket.emit('send-fridge-value', {id, value})

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }
        socket.on('fridge-value', ( {id1, value} ) => {
            socket.emit('test')
            if(id1 == id && value < 9 && value > 3)
            {
               setValue(value)
            }

        })

      }, []);
      useEffect(() => {
        socket.emit('send-fridge-value', {id, value})
  
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
            max="8"
            steps="3"
            format="°C"
            size="large"
            height="300"
            /> 
            </div>
            <div style={thermostyle}>
            <button onClick={() => {if(value<=7){
                setValue(value + 1)
            }}}>
            zwiększ temperaturę
            </button>
            <button onClick={() =>{if(value>=5){
                setValue(value - 1)
            }}}>
            zmiejsz temperaturę
            </button>
            </div>

        
        <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default MainFridge;