const { pool } = require('../config/database');
class UserModel {
    static async createUser({ name, password }) {
        const connection = await pool.getConnection();
        try {
            const user = await connection.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, password]);
            return user;
        }catch(e) {
            throw e;
        } finally {
            connection.release();
        }
    } 

    static async getUserOrUsers({ name }) {
        let sql = "SELECT * FROM users";
        const connection = await pool.getConnection();
        if(name) {
            sql += " WHERE name = ?";
        }
        try {
            const [user] = await connection.query(sql, [name]);
            return user;
        }catch(e) {
            throw e;
        } finally {
            connection.release();
        }
    }

    static async getUserById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [user] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
            return user;
        }catch(e) {
            throw e;
        } finally {
            connection.release();
        }
    }

    static async updateUser({ id, name, password }) {
        const connection = await pool.getConnection();
        try {
            const [user] = await connection.query("UPDATE users SET name = ?, password = ? WHERE id = ?", [name, password, id]);
            if(user.affectedRows > 0) {
                return user;
            } else {
                return null;
            }
        }catch(e) {
            throw e;
        } finally {
            connection.release();
        }
    }

    static async deleteUser({ id }) {
        const connection = await pool.getConnection();
        try {
            const [user] = await connection.query("DELETE FROM users WHERE id = ?", [id]);
            if(user.affectedRows > 0) {
                return user;
            } else {
                return null;
            }
        }catch(e) {
            throw e;
        } finally {
            connection.release();
        }
    }
}

module.exports = { UserModel };