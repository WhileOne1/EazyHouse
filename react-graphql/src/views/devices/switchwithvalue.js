import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import Thermometer from 'react-thermometer-component'
import SwitchComponent from '../../components/switchComponent'
const val = 15453
const deviceid = parseInt(val)
const type = 'switchwithvalue'
const valueType = '°C'



const MainSwitch = () => {
    const [value, setValue] = useState(false);
    const [value2, setValue2] = useState(21);
    const socket = socketIOClient('http://localhost:2000')

    useEffect(() => {
        const messageContainer = document.getElementById('message-container')

        
        socket.emit('check-id', {deviceid})

        socket.on('new-id', deviceid => {
            socket.emit('add-device', { deviceid,type })
            appendMessage(`Urządzenie zostało dodane`)
        })

        socket.on('old-id', deviceid => {
            
            socket.emit('old-device',  deviceid )
            appendMessage(`Urządzenie zostało podłączone`)
        })
        socket.on('value', ( {id1, isOn} ) => {
            if(id1 == deviceid)
            {
              setValue(isOn)
            }

        })
        socket.on('switchwithvalue-value', ( {id1, value2} ) => {
            socket.emit('test')
            if(id1 == deviceid && value2 < 31 && value2 > 9)
            {
                socket.emit('test')
               setValue2(value2)
            }

        })
        socket.emit('send-switchwithvalue-value', {deviceid, value,value2,valueType})

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }

      }, []);
      useEffect(() => {
        socket.emit('send-switchwithvalue-value', {deviceid, value,value2,valueType})
  
      },[value,value2])
      
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
            <SwitchComponent  isItOn={value} switchid={deviceid}
             handleToggle={() => setValue(!value)}/>
             {value}
            </div>
            <div style={thermostyle}>
            <Thermometer
            theme="light"
            value={value2}
            max="30"
            steps="3"
            format="°C"
            size="large"
            height="300"
            /> 
            </div>
            <div style={thermostyle}>
            <button onClick={() => {if(value<=30){
                setValue2(value2 + 1)
            }}}>
            zwiększ temperaturę
            </button>
            <button onClick={() =>{if(value>=10){
                setValue2(value2 - 1)
            }}}>
            zmiejsz temperaturę
            </button>
            </div>

            

        
        <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default MainSwitch;