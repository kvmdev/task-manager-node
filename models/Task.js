const pool = require("../config/database");

class Task {
    static async getAllTasks(id) {
        try {
            const connection = await pool.connect();
            try {
                const result = await connection.query("SELECT * FROM tasks WHERE user_id = $1", [id]);
                return result;
            } catch (e) {
                throw e;
            } finally {
                connection.release();
            }
        } catch (e) {
            throw e;
        }
    }

    static async createTask({ title, note, id }) {
        try {
            const connection = await pool.connect();
            try {
                const result = await connection.query("INSERT INTO tasks(title, note, user_id) VALUES ($1, $2, $3)", [title, note, id]);
                return result;
            } catch (e) {
                throw e;
            } finally {
                connection.release();
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = { Task };