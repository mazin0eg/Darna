import mongoose from "mongoose";
const { Schema } = mongoose;

const EntrepriseSchema = new Schema(
  {
    slug: {
      type: String,
      // required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    }
  },
  { timestamps: true }
);

const Entreprise = mongoose.model("Entreprise", EntrepriseSchema);

export default Entreprise;
