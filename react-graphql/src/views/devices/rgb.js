import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import SwitchComponent from '../../components/switchComponent'
const val = 8
const id = parseInt(val)
const type = 'rgb'



const Rgb = () => {
    const [value, setValue] = useState(false);
    const [color, setColor] = useState('Red');
    const socket = socketIOClient('http://localhost:2000')

    useEffect(() => {
        const messageContainer = document.getElementById('message-container')


        socket.emit('check-id', { id, type })

        socket.on('new-id', id => {
            socket.emit('add-switch', { id, value })
        })

        socket.on('old-id', id => {

            socket.emit('old-rgb', id)
            appendMessage(`Urz¹dzenie zosta³o pod³¹czone`)
        })
        socket.on('value', ({ id1, isOn }) => {
            if (id1 == id) {
                setValue(isOn)
            }

        })
        socket.on('color', ({ id1, color }) => {
            if (id1 == id) {
                setColor(color)
            }

        })
        socket.emit('send-rgb-value', { id, value })
        socket.emit('send-rgb-color', { id, color })

        function appendMessage(message) {
            const messageElement = document.createElement('div')
            messageElement.innerText = message
            messageContainer.append(messageElement)
        }

    }, []);
    useEffect(() => {
        socket.emit('send-rgb-value', { id, value })
    }, [value])
    useEffect(() => {
        socket.emit('send-rgb-color', { id, color })
    }, [color])

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

    const handleOptionChange = function (changeEvent) {
        setColor(changeEvent.target.value)
    };
    return (
        <div >
            <div style={thermostyle}>
                <SwitchComponent isItOn={value} switchid={id}
                    handleToggle={() => setValue(!value)} />
                {value}
            </div>
            <div style={thermostyle}>
                <form>
                    <div className="radio">
                        <label>
                            <input type="radio" value="Red" checked={color === 'Red'} onChange={handleOptionChange} />
                            Red 
                         </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="Green" checked={color === 'Green'} onChange={handleOptionChange} />
                            Green
                       </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="Blue" checked={color === 'Blue'} onChange={handleOptionChange} />
                            Blue
                         </label>
                    </div>
                </form>
            </div>


            <div style={infostyle} id="message-container"></div>

        </div>
    )
};
export default Rgb;