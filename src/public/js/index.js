import { io } from "socket.io-client";

const socket = io();

socket.on("connect", () => {
    console.log("Conectado al servidor de sockets");
});


socket.on("allProds", (data) => {
    console.log("Productos en tiempo real:", data);
});


socket.on("disconnect", () => {
    console.log("Desconectado del servidor de sockets");
});
