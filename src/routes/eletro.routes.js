import { Router } from "express";
import { eletroService } from "../services/eletro.services.js";

export const eletroRouter = Router()

eletroRouter.get("/", async (req, res) => {
    try {
        const eletro = await eletroService.listarEletronicos()
        res.json(eletro);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
    });

    router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const eletronicos = await eletroService.getById(id);

        if (!eletronicos) {
        return res.status(404).json({ message: 'equipamento não encontrado' });
        }

        return res.status(200).json(eletronicos);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
    });
    router.post('/', async (req, res) => {
    try {
        const { nome, tipo, disponivel } = req.body;
        const novoEletronicos = await eletroService.create({ nome, tipo, disponivel });
        return res.status(201).json(novoEletronicos);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
    });

    router.patch('/:id/disponibilidade', async (req, res) => {
    try {
        const { id } = req.params;
        const { disponivel } = req.body;

        const eletronicosAtualizado = await eletroService.updateAvailability(id, disponivel);

        if (!eletronicosAtualizado) {
        return res.status(404).json({ message: 'eletronicos não encontrado' });
        }

        return res.status(200).json(eletronicosAtualizado);
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
    });

module.exports = router;