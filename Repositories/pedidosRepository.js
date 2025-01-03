import mongoose from "mongoose";
import { Pedido } from "../Models/Pedido.js";
import { Mecanico } from "../Models/Mecanico.js";
import { Cliente } from "../Models/Cliente.js";
import { MecanicoRepository } from "./mecanicosRepository.js";

export class PedidoRepository {
    static async crearPedido(pedidoData) {
        try {

            const newPedido = new Pedido(pedidoData)
            await newPedido.save()
            return newPedido
        } catch (err) {
            throw new Error("Error al crear pedido " + err.message)
        }
    }

    static async actualizarEstado(pedido, estado, mecanicoID) {
        try {
            if (mecanicoID) {
                const mecanico = await Mecanico.findById(mecanicoID);

                // Validamos si el mecánico existe
                if (!mecanico) {
                    throw new Error("El mecánico no existe");
                }

                // Verificamos la disponibilidad del mecánico
                if (mecanico.disponibilidad) {
                    // Asignamos el mecánico al pedido y actualizamos su disponibilidad
                    pedido.id_mecanico = mecanicoID;
                    mecanico.disponibilidad = false;
                    await mecanico.save();

                    // Cambiamos el estado del pedido
                    pedido.estado = estado;
                } else {
                    throw new Error("El mecánico no está disponible");
                }
            } else {
                throw new Error("El ID del mecánico es obligatorio para actualizar este estado");
            }

            // Guardamos el pedido actualizado
            return await pedido.save();
        } catch (err) {
            throw new Error("Error al actualizar pedido: " + err.message);
        }
    }

    static async buscarPedido(pedidoID) {
        try {

            if (!mongoose.Types.ObjectId.isValid(pedidoID)) {
                throw new Error("ID no valida")
            }

            const pedido = await Pedido.findById(pedidoID)

            if (!pedido) {
                throw new Error("Pedido no encontrado")
            }

            return pedido

        } catch (err) {
            throw new Error("Error al encontrar pedido " + err.message)
        }
    }

    static async filtrarPedido(filtro) {

        try {
            const pedido = await Pedido.find(filtro)

            return pedido
        } catch (err) {
            throw new Error("Error al filtrar pedidos: " + err.message);
        }

    }

    static async eliminarPedido(pedidoID) {
        try {
            const pedido = await this.buscarPedido(pedidoID)
            const mecanicoID = pedido.id_mecanico;
            const mecanico = await Mecanico.findById(mecanicoID)
            mecanico.disponibilidad = true;
            await mecanico.save()
            await pedido.deleteOne()
            return pedido
        } catch (err) {
            throw new Error("Error al filtrar pedidos: " + err.message);
        }
    }
    

}