const { Schema, model } = require("mongoose");

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    tasks: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = model("User", User);

/* class User {

    static async getAllUsers() {
        try {
            const connection = await pool.connect();
            try {
                const result = await connection.query("SELECT * FROM users");
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

    static async getUserById(id) {
        try {
            const connection = await pool.connect();
            try {
                const result = await connection.query("SELECT * FROM users WHERE id = $1", [id]);
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

    static async generalGetUser({ name }) {
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
            const connection = await pool.connect();
            try {
                const sql = "SELECT * FROM users WHERE name = $1";
                const result = await connection.query(sql, [name]);
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

    static async createUser({ name, password }) {
        try {
            const connection = await pool.connect();
            try {
                const result = await connection.query("INSERT INTO users (name, password) VALUES ($1, $2)", [name, password]);
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

    static async updateUser({ id, name, password }) {
        try {
            const connection = await pool.connect();
            try {
                const sql = "UPDATE users SET name = $1, password = $2 WHERE id = $3";
                const result = await connection.query(sql, [name, password, id]);
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

    static async deleteUser(id) {
        try {
            const connection = await pool.connect();
            try {
                const sql = "DELETE FROM users WHERE id = $1";
                const result = await connection.query(sql, [id]);
                return result;
            } catch (e) {
                throw e;
            }
        } catch (e) {
            throw e;
        }
    }

} */