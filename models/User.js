const pool = require("../config/database");

class User {

    static async getAllUsers() {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT * FROM users");
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

    static async getUserById(id) {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
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

    static async generalGetUser({ name }) {
        /* console.log(name); */
        try {
            if (name !== undefined) {
                const user = await User.getUserByUserName({ name });
                return user;
            } else {
                const users = await User.getAllUsers();
                return users;
            }
        } catch (e) {
            throw e;
        }
    }

    static async getUserByUserName({ name }) {
        console.log(name);
        try {
            const connection = await pool.getConnection();
            try {
                const sql = "SELECT * FROM users WHERE name = ?";
                const [rows] = await connection.query(sql, [name]);
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

    static async createUser({ name, password }) {
        try {
            const connection = await pool.getConnection();
            try {
                const [rows] = await connection.query("INSERT INTO users (name, password) VALUES (?, ?)", [name, password]);
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

    static async updateUser({ id, name, password }) {
        try {
            const connection = await pool.getConnection();
            try {
                const sql = "UPDATE users SET name = ?, password = ? WHERE id = ?";
                const [rows] = await connection.query(sql, [name, password, id]);
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

    static async deleteUser(id) {
        try {
            const connection = await pool.getConnection();
            try {
                const sql = "DELETE FROM users WHERE id = ?";
                const [rows] = await connection.query(sql, [id]);
                return rows;
            } catch (e) {
                throw e;
            }
        } catch (e) {
            throw e;
        }
    }

}

module.exports = { User };