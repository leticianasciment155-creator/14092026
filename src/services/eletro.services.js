import { pool } from "../database/db.js";

class EletroService {
    async listarEletronicos() {
        const res = await pool.query("SELECT * FROM eletronicos")
        return res.rows
    }
}

export const eletroService = new EletroService()