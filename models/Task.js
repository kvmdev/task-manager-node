const pool = require("../config/database");

class Task {
    static async getAllTasks(id) {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT * FROM tasks WHERE user_id = ?", [id]);
                return rows;
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
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("INSERT INTO tasks(title, note, user_id) VALUES (?, ?, ?)", [title, note, id]);
                return rows;
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