import express, { json } from 'express';
import { dbconnect } from "./config.js";
import { MecanicoController } from './Controllers/MecanicosController.js';
import { PedidoController } from './Controllers/PedidoController.js';


const app = express()

app.use(json());

dbconnect()

app.post('/mecanico-crear', MecanicoController.crearMecanico) //{nombre, especialidad, telefono, disponiblidad (true, false)}
app.post('/crear-pedido', PedidoController.crearPedido) //{nombre, telefono, email(opcional), direccion(opcional), vehiculo, descripcion}
app.post('/pedido-estado/:pedidoID', PedidoController.actualuzarPedido) //{"estado": "asignado", "mecanico": "id del mecanico"}
app.get('/pedidos', PedidoController.filtrarPedido);
app.get('/pedido/:pedidoID', PedidoController.buscarPedido);
app.delete('/pedido-eliminar/:pedidoID', PedidoController.eliminarPedido);
app.get('/mecanico/:mecanicoID', MecanicoController.buscarMecanico);
app.get('/mecanico-pedido/:mecanicoID', PedidoController.buscarPorMecanico);

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
