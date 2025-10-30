import { Server, Socket } from "socket.io";
import Chatservice from "../services/chat";
import NotificationService from "../services/notification";
import { context } from "../server";

export default (io: Server, socket: Socket, currentUser: string) => {

    const getConversationRoom = (a: string, b: string) => {
        return [a, b].sort().join("-");
    }

    socket.on("joinRoom", (otherUserId: string) => {
        try {
            const roomId = getConversationRoom(currentUser, otherUserId);
            socket.join(roomId);
            console.log(`user ${currentUser} joined the room ${roomId}`);
        } catch (error) {
            console.error(`Error joining room: ${error}`);
            socket.emit("error", { message: "Failed to join room" });
        }
    });

    socket.on("send-message", async (data: { receiverId: string; content: string }) => {
        try {
            const roomId = getConversationRoom(currentUser, data.receiverId);
            if (!socket.rooms.has(roomId)) {
                return socket.emit("error", { message: "You must join the conversation room before sending messages" });
            }

            const message = await Chatservice.sendMessage(currentUser, data.receiverId, data.content);
            
            if (context?.[data.receiverId]) {
                context[data.receiverId].emit("new-message", message);
                await NotificationService.createNotification(data.receiverId, currentUser);
            }
            
            socket.emit("message-sent", message);
        } catch (error) {
            console.error(`Error sending message: ${error}`);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    socket.on("get-notifications", async () => {
        try {
            const notifications = await NotificationService.getNotifications(currentUser);
            socket.emit("notifications-list", notifications);
        } catch (error) {
            console.error(`Error getting notifications: ${error}`);
            socket.emit("error", { message: "Failed to get notifications" });
        }
    });

    socket.on("mark-notification-read", async (notificationId: string) => {
        try {
            await NotificationService.markAsRead(notificationId);
            socket.emit("notification-read", { notificationId });
        } catch (error) {
            console.error(`Error marking notification as read: ${error}`);
            socket.emit("error", { message: "Failed to mark notification as read" });
        }
    });

    socket.on("disconnect", () => {
        try {
            console.log(`user disconnected :`, socket.id);
        } catch (error) {
            console.error(`Error during disconnect: ${error}`);
        }
    });
};