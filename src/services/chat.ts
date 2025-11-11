import Message from "../models/Message";


class Chatservice{
    async sendMessage(senderID : string , receiverId : string, content: string){
        try {
            const message =  new Message({senderID , receiverId , content})
            await message.save();
            return message;
        } catch (error) {
            console.error(`Error saving message: ${error}`);
            throw new Error(`Failed to send message: ${error}`);
        }
    }

    async getConversation(userID1:string , userID2:string){
        try {
            return Message.find({
                $or : [
                    {senderID : userID1 , receiverId : userID2},
                    {senderID : userID2 , receiverId : userID1}
                ],
            }).sort({createdAt  : 1})
        } catch (error) {
            console.error(`Error fetching conversation: ${error}`);
            throw new Error(`Failed to get conversation: ${error}`);
        }
    }
}

export default new Chatservice