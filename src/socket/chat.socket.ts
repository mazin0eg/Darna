import { Server, Socket } from "socket.io";
import Chatservice from "../services/chat"
import { context } from "../server";

export default (io: Server, socket: Socket, currentUser: string) => {

    socket.on("send-message", async (data: { receiverId: string; content: string }) => {
        try {
            const message = await Chatservice.sendMessage(data.receiverId, currentUser, data.content)
            if (context?.[data.receiverId]) {
                context[data.receiverId].emit("new-message", message);
            }
        } catch (error) {
            console.error(`Error sending message: ${error}`);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    socket.on("joinRoom", (userId: string) => {
        try {
            socket.join(userId);
            console.log(`user ${userId} joined the room `);
        } catch (error) {
            console.error(`Error joining room: ${error}`);
            socket.emit("error", { message: "Failed to join room" });
        }
    });

    socket.on("disconnect", () => {
        try {
            console.log(`user disconnected :`, socket.id)
        } catch (error) {
            console.error(`Error during disconnect: ${error}`);
        }
    })
}