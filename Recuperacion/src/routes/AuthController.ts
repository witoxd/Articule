import { Application } from "express";
import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
    public authController: AuthController = new AuthController();
/**
 * Configures the routes for authentication.
 * 
 * @param app - The Express application instance.
 * 
 * Routes:
 * - POST /register: Handles user registration by invoking the register method of the authController.
 * - POST /login: Handles user login by invoking the login method of the authController.
 */

    public routes(app: Application): void {
        app.route("/register").post(this.authController.register);
        app.route("/login").post(this.authController.login);
    }
}