import mongoose from "mongoose";

const {Schema} = mongoose;

const messageSchema = new Schema(
    {
        senderID:{type : mongoose.Schema.Types.ObjectId , ref : "User" , required: true},
        receiverId:{type : mongoose.Schema.Types.ObjectId , ref : "User" , required: true},
        content : {type : String , required : true },
        read :{type : Boolean , default : false},
        readAt: {type : Date}
    },
    {timestamps : true}
);

const Message = mongoose.model("Message" , messageSchema);

export default Message;