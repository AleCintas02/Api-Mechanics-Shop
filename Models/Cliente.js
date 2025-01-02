import mongoose, { Schema, Types, model } from "mongoose";

const clienteSchema = new Schema({
    nombre: {type: String, required: true},
    telefono: {type: String, required: true},
    email: {type: String, required: false},
    direccion: {type:String, required:false}
})

export const Cliente = model('cliente', clienteSchema)