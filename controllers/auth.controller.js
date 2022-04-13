const authService = require('../services/auth.service');
const createError = require('http-errors');

class authController {
    static register = async (req, res, next) => {
        try {
            const user = await authService.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
    static login = async (req, res, next) => {
         try {
            const data = await authService.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
    static all = async (req, res, next) => {
        try {
            const users = await authService.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}
module.exports = authController;