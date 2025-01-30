import mongoose from "mongoose";

const { Schema } = mongoose;

const clubesSchema = new Schema({
  nombre: { type: String, required: true },
  fundacion: { type: Number, required: true },
  estadio: { type: String, required: true },
  titulos_totales: { type: Number, required: true },
  apodo: { type: String },
  titulos_obtenidos: [{ type: Schema.Types.ObjectId, ref: "Torneo" }], // Referencia a torneos ganados
  clasico_rival: { type: Schema.Types.ObjectId, ref: "Club" }, // Referencia a otro club
  provincia: { type: String, required: true },
  ciudad: { type: String, required: true },
});

export default mongoose.model("Club", clubesSchema);
