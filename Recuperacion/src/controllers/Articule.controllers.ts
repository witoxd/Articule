import {  Request, Response } from 'express';
import { Article, ArticleI } from '../models/Article';

export class ArticlesController {

    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Article, @Comprobado por batman')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllArticle(req: Request, res:Response){
        try {
            const Articles: ArticleI[] = await Article.findAll() 
            res.status(200).json({Articles})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneArticle(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Articles:ArticleI | null = await Article.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Articles){
                res.status(200).json(Articles)
            } else return  res.status(300).json({msg: "La Article no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createArticle(req: Request, res:Response){
        const {
            stock_min,
            stock_max,
            quality,
            name,
            UserId
        } = req.body;

        try {
            let body:ArticleI = {
                stock_min,
                stock_max,
                quality,
                name,
                UserId
            } 

            const Articles:ArticleI = await Article.create({...body});
            return res.status(200).json({Articles});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateArticle(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            stock_min,
            stock_max,
            quality,
            name,
            UserId
        }= req.body

        try {
            let body:ArticleI = {
                stock_min,
                stock_max,
                quality,
                name,
                UserId
            } 

            const ArticlesExist: ArticleI | null = await Article.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!ArticlesExist) return res.status(500).json({msg:"La Article No existe"})
            await Article.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Articles: ArticleI | null = await Article.findByPk(pk);
        if(Articles) return res.status(200).json({Articles})

    }

    public async deleteArticles(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const ArticlesExist: ArticleI | null = await Article.findByPk(pk);
            if(!ArticlesExist) return res.status(500).json({msg:"El Articles No existe"})
            await Article.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Article Eliminada"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 

}