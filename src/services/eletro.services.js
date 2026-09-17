import { pool } from "../database/db.js";

class EletroService {
    async getAll() {
        const query = 'SELECT * FROM equipamentos ORDER BY id ASC';
        const { rows } = await pool.query(query);
        return rows;
    }

    async getById(id) {
        const query = 'SELECT * FROM equipamentos WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0];
    }

    async create({ nome, tipo, disponivel = true }) {
        const query = `
        INSERT INTO equipamentos (nome, tipo, disponivel)
        VALUES ($1, $2, $3)
        RETURNING *
        `;
        const values = [nome, tipo, disponivel];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async updateAvailability(id, disponivel) {
        const query = `
        UPDATE equipamentos
        SET disponivel = $1
        WHERE id = $2
        RETURNING *
        `;
        const { rows } = await pool.query(query, [disponivel, id]);
        
        if (rows.length === 0) {
            return null;
        }
        
        return rows[0];
    }
}

export const eletroService = new EletroService()