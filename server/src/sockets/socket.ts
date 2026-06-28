import { Server } from "socket.io";
import { Server as HttpServer } from "http";
let io: Server;

export const initializeSocket = (server: HttpServer) => {

    io = new Server(server, {

        cors: {

            origin: "http://localhost:3000",

            methods: ["GET", "POST", "PATCH", "DELETE"],

        },

    });

    io.on("connection", (socket) => {

        console.log(`🔌 Client connected: ${socket.id}`);

        socket.on("disconnect", () => {

            console.log(`❌ Client disconnected: ${socket.id}`);

        });

    });

};

export const getIO = () => {

    if (!io) {

        throw new Error("Socket.IO has not been initialized.");

    }

    return io;

};