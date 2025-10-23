import mongoose from "mongoose";
const { Schema } = mongoose;

const EntrepriseSchema = new Schema(
	{
		name: { 
            type: String, 
            required: true, 
            trim: true 
        },
		description: { 
            type: String, 
            trim: true 
        },
		creatorId: { 
            type: Schema.Types.ObjectId, 
            ref: "User", 
            required: true },
		phone: { 
            type: String, 
            trim: true },
		address: { 
            type: String, 
            trim: true },
	},
	{ timestamps: true }
);

const Entreprise = mongoose.model("Entreprise", EntrepriseSchema);

export default Entreprise;

