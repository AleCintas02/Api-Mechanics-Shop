import express, { json } from 'express';
import { dbconnect } from "./config.js";
import { MecanicoController } from './Controllers/MecanicosController.js';
import { PedidoController } from './Controllers/PedidoController.js';


const app = express()

app.use(json());

dbconnect()

app.post('/mecanico-crear', MecanicoController.crearMecanico)
app.post('/crear-pedido', PedidoController.crearPedido)
app.post('/pedido-estado/:pedidoID', PedidoController.actualuzarPedido)
app.get('/pedidos', PedidoController.filtrarPedido);
app.get('/pedido/:pedidoID', PedidoController.buscarPedido);
app.delete('/pedido-eliminar/:pedidoID', PedidoController.eliminarPedido);

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
