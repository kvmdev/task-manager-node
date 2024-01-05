const { AuthService } = require("../services/AuthService");
class AuthController {
    static async login(req, res) {
        try {
            const token = await AuthService.login(req.body.name, req.body.password);
            if (token) {
                res.send({ token });
            }
        } catch (e) {
            res.sendStatus(401).send("Invalid credentials");
        }
    }
    
    static async register(req, res) {
        try {
            const token = await AuthService.register(req.body.name, req.body.password);
            if (token) {
                res.send({ token });
            }
        } catch (e) {
            res.sendStatus(401).send("Invalid credentials");
        }
    }
}

module.exports = { AuthController };