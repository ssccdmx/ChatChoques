const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://ssccdmx.github.io", // Permitir conexión desde GitHub Pages
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.get("/", (req, res) => {
    res.send("Servidor WebSockets activo");
});

io.on("connection", (socket) => {
    console.log("Un usuario se ha conectado.");

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); // Enviar a todos los usuarios
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado.");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
