import { Request, Response } from "express";
import formidable from "formidable";
import { request } from "http";
import sanitize from "sanitize-html";
import { ArticleService } from "./article-service";
import { ArticleForm } from "./type";
import { form, ImageArray, ReturnFieldString, ReturnFieldStringArray } from "./upload";

import { env } from "./env";
import jwtSimple from "jwt-simple";

export class ArticleController {
    constructor(private articleService: ArticleService) { }

    makeId = async (req: Request, res: Response) => {
        try {
            const author: number = req.body.author_id;
            if (!author) {
                res.status(400).json({ error: "missing author in request" });
                return;
            }
            let result = await this.articleService.makeId(author);

            if (result) {
                return res.json(result[0]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    getPublishedArticle = async (req: Request, res: Response) => {
        try {
            console.log(req.params.id);

            let id = +req.params.id;
            if (!id) {
                res.status(400).json({ error: "Missing id in req.params" });
                return;
            }
            let result = await this.articleService.getPublishedArticle(id);
            // console.log('result',result)
            if (result) {
                let sanitizedContent = sanitize(result.content, {
                    allowedTags: [...sanitize.defaults.allowedTags, "img"],
                });
                result.content = sanitizedContent
                return res.json(result);
            }
        } catch (e) {
            console.log(e);
        }
    };
    getArticleByVersion = async (req: Request, res: Response) => {
        try {
            console.log('id',req.params.id);

            let id = +req.params.id;
            let version_id = +req.params.version_id;
            if (!id) {
                res.status(400).json({ error: "Missing id in req.params" });
                return;
            }
            if (!version_id) {
                res.status(400).json({ error: "Missing version_id in req.params" });
                return;
            }
            let result = await this.articleService.getArticleByVersion(id,version_id);
            console.log('result',result)
            if (result) {
                let sanitizedContent = sanitize(result.content, {
                    allowedTags: [...sanitize.defaults.allowedTags, "img"],
                });
                result.content = sanitizedContent
                
                return res.json(result);
            }
        } catch (e) {
            console.log(e);
        }
    };

    edit = async (req: Request, res: Response) => { };

    delete = async (req: Request, res: Response) => { };

    getPendingArticles = async (req: Request, res: Response) => { 
        let result = await this.articleService.getPendingArticles();

        return res.status(200).json(result)
    };

    

    post = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                let article_id: string = ReturnFieldString(fields.articleId)
                let dataContent = ReturnFieldString(fields.content)
                if(files.image){
                    let imageArray = ImageArray(files.image)               
                let imageIdxArray = ReturnFieldStringArray(fields.imageSrc)
                let imageResult = await this.articleService.saveImage(imageArray, article_id, imageIdxArray)
                imageResult.forEach(item => {
                    dataContent = dataContent.replace(item.image_idx, `/uploads/${item.image_name}`)
                })
                }
                let title = ReturnFieldString(fields.title)
                let ref_site = ReturnFieldString(fields.refSite)
                let result = await this.articleService.post({
                    article_id,
                    title,
                    ref_site,
                    content: dataContent,
                });

                if (result) {
                    return res.json({ msg: "post article success" });
                }

            })
        } catch (e) {
            console.log(e);
        }
    };
    HomePageOverview = async (req: Request, res: Response) => {
        try {
            let result = await this.articleService.HomePageOverview();
            return res.json(result);
        } catch (e) {
            res.status(500).json({ error: String(e) });
            console.log(e);
        }
    };
    approveArticlePage = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                console.log("HUHUHUHUHUHUHU");
                

                // console.log('fields',fields)
                // console.log('files',files)

                let article_id: string = ReturnFieldString(fields.articleId)
                let dataContent = ReturnFieldString(fields.content)

                if(files.image){
                    let imageArray = ImageArray(files.image)               
                    let imageIdxArray = ReturnFieldStringArray(fields.imageSrc)
                    let imageResult = await this.articleService.saveImage(imageArray, article_id, imageIdxArray)
                    imageResult.forEach(item => {
                        dataContent = dataContent.replace(item.image_idx, `/uploads/${item.image_name}`)
                    })
                }

                let title = ReturnFieldString(fields.title)
                let ref_site = ReturnFieldString(fields.refSite)
                let version = ReturnFieldString(fields.version)

                console.log(+version, req.user!.editor_id!);
                

                let result = await this.articleService.approveArticlePage(+version, +req.user!.editor_id!);



                return res.json({ msg: "post article success" });
                // if (result) {
                // }

            })
        } catch (e) {
            console.log(e);
        }
    };
}



    // post = async (req: Request, res: Response) => {
    //     try {
    //         const { id, title, author, refSite, content }: ArticleForm = req.body;
    //         if (!id || !title || !refSite || !content) {
    //             res.status(400).json({ error: "missing part in request" });
    //             return;
    //         }
    //         let result = await this.articleService.post({
    //             id,
    //             title,
    //             author,
    //             refSite,
    //             content,
    //         });

    //         if (result) {
    //             return res.json({ msg: "post article success" });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };