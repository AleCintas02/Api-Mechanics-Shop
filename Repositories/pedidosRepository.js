import mongoose from "mongoose";
import { Pedido } from "../Models/Pedido.js";
import { Mecanico } from "../Models/Mecanico.js";
import { Cliente } from "../Models/Cliente.js";

export class PedidoRepository{
    static async crearPedido(pedidoData){
        try{

            const newPedido = new Pedido(pedidoData)
            await newPedido.save()
            return newPedido
        }catch(err){
            throw new Error("Error al crear pedido " + err.message)
        }
    }

    static async actualizarEstado(pedido, estado, mecanicoID){
        try{
            pedido.estado = estado

            if(mecanicoID){
                pedido.id_mecanico = mecanicoID
            }

            

            return await pedido.save()
        }catch(err){
            throw new Error("Error al actualizar pedido " + err.message)
        }
    }

    static async buscarPedido(pedidoID){
        try{

            if(!mongoose.Types.ObjectId.isValid(pedidoID)){
                throw new Error("ID no valida")
            }

            const pedido = await Pedido.findById(pedidoID)

            if(!pedido){
                throw new Error("Pedido no encontrado")
            }

            return pedido

        }catch(err){
            throw new Error("Error al encontrar pedido " + err.message)
        }
    }

    static async filtrarPedido(filtro){

        try{
            const pedido = await Pedido.find(filtro)

            return pedido
        }catch(err){
            throw new Error("Error al filtrar pedidos: " + err.message);
        }

    }

    static async eliminarPedido(pedidoID){
        try{
            const pedido = await this.buscarPedido(pedidoID)
            await pedido.deleteOne()
            return pedido
        }catch(err){
            throw new Error("Error al filtrar pedidos: " + err.message);
        }
    }

}