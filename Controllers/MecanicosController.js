import { Mecanico } from "../Models/Mecanico.js";
import { MecanicoRepository } from "../Repositories/mecanicosRepository.js";

export class MecanicoController{
    static async crearMecanico(req, res){
        try{
            const mecanicoData = req.body;
            const newMecancio = await MecanicoRepository.crearMecanico(mecanicoData)

            return res.status(200).json({mecanico: newMecancio})

        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
}