import { Server , Socket } from "socket.io";
import Chatservice from "../services/chat"
import { context } from "../server";

export default (io: Server , socket:Socket) =>{
    console.log("a user is connected " , socket.id);

    socket.on("sendMEssage" , async(data : {reciverId : string ; senderId:  string ; content  : string }) => {
        const message = await Chatservice.sendMessage(data.reciverId, data.senderId, data.content )

        context?.[data.reciverId].emit("new-message" , message);

    });

    socket.on("joinRoom" , (userId: string) =>{
        socket.join(userId);
        console.log(`user ${userId} joined the room `);
    });

    socket.on("disconnect" , ()=>{
        console.log(`user disconnected :`,socket.id)
    })
}