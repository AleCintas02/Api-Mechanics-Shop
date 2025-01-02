import mongoose, {Schema, model} from "mongoose";

const pedidoSchema = new Schema({
    id_cliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Clientes', required: true},
    vehiculo: {type: String, required: true},
    descripcion: {type: String, required: false},
    estado: {type:String, enum: ['pendiente', 'asignado', 'en proceso', 'en espera', 'compleado', 'entregado', 'cancelado'], default: 'pendiente', required:true},
    id_mecanico: {type: mongoose.Schema.Types.ObjectId, ref: 'Mecanicos', required:false},
    fecha_finalizacion: {type: Date, default: null}
})

export const Pedido = model('Pedido', pedidoSchema)