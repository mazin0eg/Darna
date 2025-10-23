import Message from "../models/Message";


class Chatservice{
    async sendMessage(senderID : string , reciverID : string, content: string){
        const message =  new Message({senderID , reciverID , content})
        await message.save();
        return message;
    }

    async getConversation(userID1:string , userID2:string){
        return Message.find({
            $or : [
                {senderID : userID1 , reciverID : userID2},
                {senderID : userID2 , reciverID : userID1}
            ],
        }).sort({createdAt  : 1})
    }
}

export default new Chatservice