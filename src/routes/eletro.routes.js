import { Router } from "express";
import { eletroService } from "../services/eletro.services.js";

export const eletroRouter = Router()

eletroRouter.get("/", async (req, res) => {
    try {
        const equipamentos = await eletroService.getAll();
        return res.status(200).json(equipamentos);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

eletroRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const equipamento = await eletroService.getById(id);

        if (!equipamento) {
        return res.status(404).json({ message: 'equipamento não encontrado' });
        }

        return res.status(200).json(equipamento);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

eletroRouter.post('/', async (req, res) => {
    try {
        const { nome, tipo, disponivel } = req.body;
        const equipamento = await eletroService.create({ nome, tipo, disponivel });
        return res.status(201).json(equipamento);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});

eletroRouter.patch('/:id/disponibilidade', async (req, res) => {
    try {
        const { id } = req.params;
        const { disponivel } = req.body;

        const equipamento = await eletroService.updateAvailability(id, disponivel);

        if (!equipamento) {
        return res.status(404).json({ message: 'equipamento não encontrado' });
        }

        return res.status(200).json(equipamento);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});