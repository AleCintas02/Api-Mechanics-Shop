import { Cliente } from "../Models/Cliente.js";


export class ClienteRepository{
    static async crearCliente(clienteData){
        try{    
            const newCliente = new Cliente(clienteData)
            await newCliente.save()
            return newCliente

        }catch(err){
            throw new Error("Error al crear cliente")
        }
    }
}