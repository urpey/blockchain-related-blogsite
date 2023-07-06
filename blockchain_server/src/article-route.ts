import express from 'express';
import { knex } from './knex'
import {ArticleController} from './article-controller';
import {ArticleService} from './article-service';
import { isEditor, isLoggedIn } from './guard';

const articleService = new ArticleService(knex);

export let articleRoutes = express.Router()

let articleController = new ArticleController(articleService)

articleRoutes.post('/newArticleId',articleController.makeId)
articleRoutes.post('/newArticleContent',articleController.post)
articleRoutes.get('/HomePageOverview',articleController.HomePageOverview)
articleRoutes.get('/article/pending',articleController.getPendingArticles)
articleRoutes.get('/article/:id',articleController.getPublishedArticle)
articleRoutes.get('/article/:id/version/:version_id',articleController.getArticleByVersion)

articleRoutes.post('/article/:id/version/:version_id/approve',isLoggedIn,isEditor,articleController.approveArticlePage)






