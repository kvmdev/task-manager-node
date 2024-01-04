const pool = require('../config/database');
class User {
    static async getAllUsers() {
        const connection = pool.getConnection();
        try {
            const rows = (await connection).query('SELECT * FROM users');
            return rows;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            (await connection).release();
        }
    }

    static async createUser({ name, password}) {
        const connection = pool.getConnection();
        try {
            const rows = (await connection).query('INSERT INTO users (name, password) VALUES (?, ?)', [name, password]);
            return rows;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            (await connection).release();
        }
    }

    static async updateUser({ id, name, password }) {
        const connection = pool.getConnection();
        try {
            const rows = (await connection).query('UPDATE users SET name = ?, password = ? WHERE id = ?', [name, password, id]);
            return rows;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            (await connection).release();
        }
    }

    static async deleteUser(id){
        const connection = pool.getConnection();
        try {
            const rows = (await connection).query('DELETE FROM users WHERE id = ?', [id]);
            return rows;
        } catch (e) {
            console.log(e);
            return null;
        } finally {
            (await connection).release();
        }
    }
}

module.exports = { User }