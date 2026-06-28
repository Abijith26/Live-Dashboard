import "dotenv/config";

import app from "./app";
import http from "http";
import { initializeSocket } from "./sockets/socket";

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});