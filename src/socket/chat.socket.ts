import { Server , Socket } from "socket.io";
import Chatservice from "../services/chat"
import { context } from "../server";

export default (io: Server , socket:Socket, currentUser: string) =>{
    console.log("a user is connected " , currentUser);

    socket.on("send-message" , async(data : {receiverId : string ; content  : string }) => {
        const message = await Chatservice.sendMessage(data.receiverId, currentUser, data.content )
        context?.[data.receiverId].emit("new-message" , message);

    });

    socket.on("joinRoom" , (userId: string) =>{
        socket.join(userId);
        console.log(`user ${userId} joined the room `);
    });

    socket.on("disconnect" , ()=>{
        console.log(`user disconnected :`,socket.id)
    })
}