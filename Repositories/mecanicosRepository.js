import mongoose from "mongoose";
import { Mecanico } from "../Models/Mecanico.js";
import { Pedido } from "../Models/Pedido.js";

export class MecanicoRepository {
    static async crearMecanico(mecanicoData) {
        try {
            const mecanico = new Mecanico(mecanicoData);
            return await mecanico.save();
        } catch (err) {
            throw new Error("Error al crear mecánico: " + err.message); 
        }
    }

    static async buscarMecanico(mecanicoID) {
        try {
            if (!mongoose.Types.ObjectId.isValid(mecanicoID)) {
                throw new Error("ID de mecánico no válido");
            }
    
            const mecanico = await Mecanico.findById(mecanicoID);
    
            if (!mecanico) {
                throw new Error("Mecánico no encontrado");
            }
    
            return mecanico;
        } catch (err) {
            throw new Error("Error al buscar mecánico: " + err.message);
        }
    }
    
}