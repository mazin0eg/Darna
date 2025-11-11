/**
 * @swagger
 * components:
 *   schemas:
 *     WebSocketEvents:
 *       type: object
 *       description: WebSocket events for real-time communication
 * 
 * /websocket-chat:
 *   description: |
 *     WebSocket connection for real-time chat and notifications.
 *     Connect to: ws://localhost:3000
 *     
 *     **Authentication**: Include Bearer token in connection headers:
 *     ```
 *     Authorization: Bearer <your_jwt_token>
 *     ```
 *     
 *     ## Client Events (Send to Server):
 *     
 *     ### joinRoom
 *     Join a conversation room before sending messages
 *     ```json
 *     {
 *       "event": "joinRoom",
 *       "data": "other_user_id"
 *     }
 *     ```
 *     
 *     ### send-message
 *     Send a message to another user (must join room first)
 *     ```json
 *     {
 *       "event": "send-message",
 *       "data": {
 *         "receiverId": "receiver_user_id",
 *         "content": "Hello there!"
 *       }
 *     }
 *     ```
 *     
 *     ### get-notifications
 *     Get list of notifications for current user
 *     ```json
 *     {
 *       "event": "get-notifications"
 *     }
 *     ```
 *     
 *     ### mark-notification-read
 *     Mark a specific notification as read
 *     ```json
 *     {
 *       "event": "mark-notification-read",
 *       "data": "notification_id"
 *     }
 *     ```
 *     
 *     ## Server Events (Receive from Server):
 *     
 *     ### new-message
 *     Receive a new message
 *     ```json
 *     {
 *       "event": "new-message",
 *       "data": {
 *         "_id": "message_id",
 *         "senderID": "sender_user_id",
 *         "receiverId": "receiver_user_id",
 *         "content": "Hello there!",
 *         "read": false,
 *         "createdAt": "2025-10-30T10:30:00.000Z"
 *       }
 *     }
 *     ```
 *     
 *     ### new-notification
 *     Receive a new notification
 *     ```json
 *     {
 *       "event": "new-notification",
 *       "data": {
 *         "_id": "notification_id",
 *         "receiverId": "current_user_id",
 *         "senderId": "sender_user_id",
 *         "read": false,
 *         "createdAt": "2025-10-30T10:30:00.000Z"
 *       }
 *     }
 *     ```
 *     
 *     ### notifications-list
 *     List of notifications for current user
 *     ```json
 *     {
 *       "event": "notifications-list",
 *       "data": [notification_objects]
 *     }
 *     ```
 *     
 *     ### message-sent
 *     Confirmation that message was sent successfully
 *     ```json
 *     {
 *       "event": "message-sent",
 *       "data": message_object
 *     }
 *     ```
 *     
 *     ### notification-read
 *     Confirmation that notification was marked as read
 *     ```json
 *     {
 *       "event": "notification-read",
 *       "data": {
 *         "notificationId": "notification_id"
 *       }
 *     }
 *     ```
 *     
 *     ### error
 *     Error message from server
 *     ```json
 *     {
 *       "event": "error",
 *       "data": {
 *         "message": "Error description"
 *       }
 *     }
 *     ```
 *     
 *     ## Testing with Postman:
 *     1. Create WebSocket connection to ws://localhost:3000
 *     2. Add Bearer token in connection headers
 *     3. Join room first: send "joinRoom" event with other user's ID
 *     4. Send messages using "send-message" event
 *     5. Listen for incoming events: "new-message", "new-notification", etc.
 */