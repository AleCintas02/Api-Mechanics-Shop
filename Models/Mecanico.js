import mongoose, {Schema, model} from "mongoose";

const mecanicoSchema = new Schema({
    nombre: {type: String, required: true},
    especialidad: {type: String, required: true},
    telefono: {type: String, required: false},
    disponibilidad: {type:Boolean, required:true}
})

export const Mecanico = model('Mecanico', mecanicoSchema)