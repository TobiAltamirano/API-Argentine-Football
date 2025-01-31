import mongoose from "mongoose";

const { Schema } = mongoose;

const clubesSchema = new Schema({
  nombre: { type: String, required: true },
  fundacion: { type: Number, required: true },
  estadio: { type: String, required: true },
  titulos: { type: Number, required: true },
  apodo: { type: String },
  caracteristicas: [{ type: String }],
  clasico_rival: { type: String },
  provincia: { type: String, required: true },
  ciudad: { type: String, required: true },
});

export default mongoose.model("Club", clubesSchema);
