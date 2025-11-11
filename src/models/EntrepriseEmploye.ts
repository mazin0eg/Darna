import mongoose from "mongoose";

const { Schema } = mongoose;

const EntrepriseEmployeSchema = new Schema(
  {
    entrepriseId: {
      type: Schema.Types.ObjectId,
      ref: "Entreprise",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["employé"],
      default: "employé",
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      trim: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EntrepriseEmployeSchema.index({ entrepriseId: 1, userId: 1 }, { unique: true });

const EntrepriseEmploye = mongoose.model("EntrepriseEmploye", EntrepriseEmployeSchema);

export default EntrepriseEmploye;
