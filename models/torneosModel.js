import mongoose from "mongoose";

const { Schema } = mongoose;

const torneosSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  region: { type: String, required: true },
  creacion: { type: Number, required: true },
  campeones: [{ type: Schema.Types.ObjectId, ref: "Club" }], // Referencia a clubes campeones
  clasificados: [{ type: Schema.Types.ObjectId, ref: "Club" }], // Referencia a clubes clasificados
});

export default mongoose.model("Torneo", torneosSchema);
