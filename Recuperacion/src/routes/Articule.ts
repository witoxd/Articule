import { Application } from "express";
import { ArticlesController } from "../controllers/Articule.controllers";
import { authMiddleware } from "../middleware/authMiddleware";

export class ArticuleRoutes {
    public ArticlesController = new ArticlesController();

    public routes(app: Application): void {
        app.route("/Articule").get(authMiddleware, this.ArticlesController.getAllArticle);
        app.route('/Articule/:id').get(authMiddleware, this.ArticlesController.getOneArticle);
        app.route("/Articule").post(authMiddleware, this.ArticlesController.createArticle);
        app.route("/Articule/:id").put(authMiddleware, this.ArticlesController.updateArticle);
        app.route("/Articule/:id").delete(authMiddleware, this.ArticlesController.deleteArticles);

        app.route("/Articule2").get(this.ArticlesController.getAllArticle);
        app.route('/Articule2/:id').get(this.ArticlesController.getOneArticle);
        app.route("/Articule2").post(this.ArticlesController.createArticle);
        app.route("/Articule2/:id").put(this.ArticlesController.updateArticle);
        app.route("/Articule2/:id").delete(this.ArticlesController.deleteArticles);
    }
};