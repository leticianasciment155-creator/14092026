import { Router } from "express";
import { eletroService } from "../services/eletro.services.js";

export const eletroRouter = Router()

eletroRouter.get("/", async (req, res) => {
    try {
        const eletro = await eletroService.listarEletronicos()
        res.json(eletro);        
    } catch (error) {
        console.error(error);        
    }
})