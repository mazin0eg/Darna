import mongoose from "mongoose";

const {Schema} = mongoose;

const messageSchema = new Schema(
    {
        senderID:{type : mongoose.Schema.Types.ObjectId , ref : "User" , require: true},
        reciverID:{type : mongoose.Schema.Types.ObjectId , ref : "User" , require: true},
        content : {type : String , require : true },
        read :{type : Boolean , default : false}
    },
    {timestamps : true}
);

const Message = mongoose.model("Message" , messageSchema);

export default Message;