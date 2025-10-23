// src/server.ts
import app from "./app";
import http from "http";
import { Server, Socket } from "socket.io";
import chatSocket from "./socket/chat.socket";

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
  const data = socket.handshake.headers['authorization'];
  if(!data?.split(' ')[1]) return socket.disconnect();
  context[data?.split(' ')[1]] =  socket;
  console.log(`User connected: ${socket.id}`);
  chatSocket(io, socket);

  socket.on("disconnect", () => {
    console.log(` User disconnected: ${socket.id}`);
  });
});


server.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
