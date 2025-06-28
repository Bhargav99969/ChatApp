import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReiverSocketId(userId){
    return userSocketMap[userId]
}

// Maps
const userSocketMap = {}; // userId -> socket.id
const socketUserMap = {}; // socket.id -> userId

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("A user connected:", socket.id, "UserID:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    socketUserMap[socket.id] = userId;
  }

  io.emit("x", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    const userId = socketUserMap[socket.id];
    console.log("User disconnected:", socket.id, "UserID:", userId);

    if (userId) {
      delete userSocketMap[userId];
      delete socketUserMap[socket.id];
    }

    io.emit('x', Object.keys(userSocketMap));
  });
});

export { io, app, server };
