import { Server } from "socket.io";

function socketConnection(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    let users = [];

    io.on("connection", (socket) => {
        socket.on("setup", (Id) => {
            // const id = Id?.toString()
            socket.join(123);
            console.log(`room joined : ${123}`);
            socket.emit("connected");
        });

        socket.on("join room", (room) => {
            console.log("joined room ");
        });

        socket.on("send_message", (data) => {
            console.log(data, "on send_message calling");
            socket.to(123).emit("receive_message", data);
            console.log("receive_message emitted...");
        });
    });
}

export default socketConnection;
