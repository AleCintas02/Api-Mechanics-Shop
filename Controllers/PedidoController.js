import mongoose, { isValidObjectId } from "mongoose";
import { ClienteRepository } from "../Repositories/clienteRepository.js";
import { PedidoRepository } from "../Repositories/pedidosRepository.js";


export class PedidoController {
    static async crearPedido(req, res) {
        try {
            const { nombre, telefono, email, direccion, vehiculo, descripcion } = req.body

            const cliente = await ClienteRepository.crearCliente({ nombre, telefono, email, direccion })

            const pedido = await PedidoRepository.crearPedido({
                id_cliente: cliente.id,
                vehiculo, descripcion
            })

            return res.status(200).json({ cliente: cliente, resultado: pedido })
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async actualuzarPedido(req, res) {
        try {
            const id = req.params.pedidoID

            const { estado, mecanicoID } = req.body

            const pedido = await PedidoRepository.buscarPedido(id)

            const pedidoActualizado = await PedidoRepository.actualizarEstado(pedido, estado, mecanicoID);

            return res.status(200).json({ pedido: pedidoActualizado })

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async filtrarPedido(req, res) {
        try {
            const { estado, mecanicoID } = req.query
            console.log("Parametros recibidos:", req.query);
            const filtro = {}

            if (estado) {
                filtro.estado = estado
            }

            if (mecanicoID) {
                filtro.id_mecanico = mecanicoID
            }

            const pedidos = await PedidoRepository.filtrarPedido(filtro)

            return res.status(200).json({ pedidos })

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async buscarPedido(req, res) {
        try {
            const id = req.params.pedidoID

            const pedido = await PedidoRepository.buscarPedido(id)

            return res.status(200).json({ pedido })

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async eliminarPedido(req, res) {
        try {
            const id = req.params.pedidoID;

            // Validar el formato del ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "ID de pedido no válida" });
            }

            // Intentar eliminar el pedido
            const pedidoEliminar = await PedidoRepository.eliminarPedido(id);

            return res.status(200).json({ mensaje: "Pedido eliminado", pedido: pedidoEliminar });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

}