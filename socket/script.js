const socket = io('http://localhost:2000')

const id = prompt('Id urzadzenia')
const name = prompt('Nazwa urzadzenia')
socket.emit('new-device', { id, name })

