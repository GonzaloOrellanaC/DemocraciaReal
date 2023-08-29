import { io } from "socket.io-client";
const socket = io()

const sendIsActive = () => {
    console.log('Revisando')
    socket.emit('isConnected', {id: window.localStorage.getItem('_id')})
}
const nuevoUsuarioCreado = () => {
    socket.emit('nuevoUsuario', {_id: window.localStorage.getItem('_id')})
}
const nuevoClienteCreado = () => {
    socket.emit('nuevoCliente', {_id: window.localStorage.getItem('_id')})
}

const encuestaCreadaEditada = () => {
    socket.emit('encuestaCreadaEditada', {_id: window.localStorage.getItem('_id')})
}

const encuestaRespondida = () => {
    socket.emit('encuestaRespondida', {_id: window.localStorage.getItem('_id')})
}

export default {
    nuevoUsuarioCreado,
    nuevoClienteCreado,
    sendIsActive,
    encuestaRespondida,
    encuestaCreadaEditada
}