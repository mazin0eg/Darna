// src/server.ts
import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import chatSocket from "./socket/chat.socket";
import { extractTokenFromHeader, verifyToken } from "./utils/jwt";

const port: number = 3000;
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


export const context : Record<string, Socket> = {};

io.on("connection", (socket ) => {
  const token = extractTokenFromHeader(socket.handshake.headers['authorization'])
  const currentUserId = verifyToken(token).userId;
  if(!currentUserId) return socket.disconnect();
  context[currentUserId] =  socket;
  console.log(`User connected: ${socket.id}`);
  chatSocket(io, socket, currentUserId);

  socket.on("disconnect", () => {
    console.log(` User disconnected: ${socket.id}`);
  });
});


server.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
