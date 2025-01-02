import mongoose from "mongoose";
import { Mecanico } from "../Models/Mecanico.js";

export class MecanicoRepository {
    static async crearMecanico(mecanicoData) {
        try {
            const mecanico = new Mecanico(mecanicoData);
            return await mecanico.save();
        } catch (err) {
            throw new Error("Error al crear mecánico: " + err.message); // Corregido "err.mesagge" a "err.message"
        }
    }
}