import mongoose from "mongoose";
import makeSlugFrom from "../utils/slug";
const { Schema } = mongoose;

const propertySchema = new Schema(
  {
    slug: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type_transaction: {
      type: String,
      enum: [
        "vente",
        "location_journaliere",
        "location_mensuelle",
        "location_longue_duree",
        "location_saisonniere",
      ],
      required: true,
    },
    prix: {
      type: Number,
    },
    prix_par_jour: {
      type: Number,
    },
    disponibilites: [
      {
        debut: Date,
        fin: Date,
      },
    ],
    localisation: {
      adresse: { type: String, trim: true },

      coordonnees: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number],
        },
      },
    },
    caracteristiques: {
      superficie: { type: Number },
      dimensions_pieces: [
        {
          nom: String,
          longueur: Number,
          largeur: Number,
          surface: Number,
        },
      ],
      nombre_chambres: { type: Number },
      nombre_salles_de_bain: { type: Number },
      equipements: [String],
      regles_internes: {
        animaux_autorises: { type: Boolean, default: false },
        fumeurs_autorises: { type: Boolean, default: false },
        autres: { type: String },
      },
    },
    diagnostics_energetiques: {
      dpe: { type: String },
      consommation: { type: Number },
      details: { type: String },
    },
    medias: [
      {
        url: { type: String },
        type: { type: String, enum: ["image", "video"], default: "image" },
        vignette: { type: String },
        legende: { type: String },
      },
    ],
    createur_type: {
      type: String,
      enum: ["particulier", "employe_entreprise"],
      default: "particulier",
    },
    entreprise_nom: {
      type: String,
      trim: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entrepriseId: {
      type: Schema.Types.ObjectId,
      ref: "Entreprise",
    },
  },
  { timestamps: true }
);

propertySchema.pre("validate", function (this: any, next: any) {
  try {
    if (!this.slug) {
      const from = this.titre || "";
      this.slug = makeSlugFrom(from, "annonce", true);
    }
  } catch (err) {}
  next();
});

propertySchema.index({ "localisation.coordonnees": "2dsphere" });

const Property = mongoose.model("Property", propertySchema);

export default Property;
