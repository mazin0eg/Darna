import Notification from "../models/Notification";
import { context } from "../server";

class NotificationService {
    async createNotification(receiverId: string, senderId: string) {
        try {
            const notification = new Notification({
                receiverId,
                senderId
            });

            await notification.save();

            if (context[receiverId]) {
                context[receiverId].emit("new-notification", notification);
            }

            return notification;
        } catch (error) {
            console.error(`Error creating notification: ${error}`);
            throw new Error(`Failed to create notification: ${error}`);
        }
    }

    async getNotifications(receiverId: string) {
        try {
            return await Notification.find({ receiverId })
                .populate("senderId", "name email")
                .sort({ createdAt: -1 });
        } catch (error) {
            console.error(`Error fetching notifications: ${error}`);
            throw new Error(`Failed to get notifications: ${error}`);
        }
    }

    async markAsRead(notificationId: string) {
        try {
            return await Notification.findByIdAndUpdate(
                notificationId,
                { read: true },
                { new: true }
            );
        } catch (error) {
            console.error(`Error marking notification as read: ${error}`);
            throw new Error(`Failed to mark notification as read: ${error}`);
        }
    }
}

export default new NotificationService();