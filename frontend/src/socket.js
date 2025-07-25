import io from 'socket.io-client'
const url = "http://localhost:3005/"
const socket = io(url);
export default socket;