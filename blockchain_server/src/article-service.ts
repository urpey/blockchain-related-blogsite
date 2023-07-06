import { timeStamp } from "console";
import express from "express";
import formidable from "formidable";
import Integer, { MAX_VALUE } from "integer";
import { Knex } from "knex";
import { ApproveForm, ArticleForm } from "./type";

export class ArticleService {
  constructor(private knex: Knex) {}

  makeId = async (author: number) => {
    try {
      const article_id = await this.knex
        .insert({
          author_id: author,
        })
        .into("articles")
        .returning("id");
      return article_id;
    } catch (e) {
      console.log(e);
    }
  };

  post = async (articleForm: ArticleForm) => {
    try {
      await this.knex
        .insert({
          article_id: articleForm.article_id,
          title: articleForm.title,
          ref_site: articleForm.ref_site,
          content: articleForm.content,
        })
        .into("articles_version");
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  getPendingArticles = async () => {
    const row = await this.knex
      .select(
        "articles_version.title",
        "users.username as author",
        "editors.username as editor",
        "ref_site",
        "content",
        'articles_version.article_id',
        'articles_version.id as version_id'
      )
      .from("articles_version")
      .innerJoin("articles", "article_id", "articles.id")
      .innerJoin("users", "articles.author_id", "users.id")
      .leftJoin("editors", "articles_version.editor_id", "editors.id")
      .whereNull("articles_version.editor_id");
    // .whereNull("articles_version.approved_at")
      // .whereIn(
      //   "article_version.id",
      //   this.knex
      //     .max("articles_version.id")
      //     .from("articles_version")
      //     .where("articles_version.article_id", this.knex.raw("articles.id"))
      // )

    return row;
  };

  getPublishedArticle = async (id: number) => {
    const row = await this.knex
      .select(
        "articles_version.title",
        "users.username as author",
        "editors.username as editor",
        "ref_site",
        "content"
      )
      .from("articles_version")
      .innerJoin("articles", "article_id", "articles.id")
      .innerJoin("users", "articles.author_id", "users.id")
      .innerJoin("editors", "articles_version.editor_id", "editors.id")
      .whereNotNull("articles_version.approved_at")
      .whereIn(
        "articles_version.id",
        this.knex
          .max("articles_version.id")
          .from("articles_version")
          .where("articles_version.article_id", id)
      )
      .first();
    return row;

  };
  
  getArticleByVersion = async (id: number, version_id: number) => {
    const row = await this.knex
      .select(
        "articles_version.title",
        "users.username as author",
        "editors.username as editor",
        "ref_site",
        "content"
      )
      .from("articles_version")
      .innerJoin("articles", "article_id", "articles.id")
      .innerJoin("users", "articles.author_id", "users.id")
      .leftJoin("editors", "articles_version.editor_id", "editors.id")
      
      .where("articles_version.id", version_id)
      .where("articles_version.article_id", id)
      .first();

    return row;
  };

  saveImage = async (
    images: formidable.File[],
    articleId: string,
    idxArray: string[]
  ) => {
    for (let i = 0; i < images.length; i++) {
      console.log(images.length);
      await this.knex
        .insert({
          article_id: articleId,
          image_name: images[i].newFilename,
          image_idx: idxArray[i],
        })
        .into("articles_image");
    }

    let result = await this.knex
      .select("image_idx", "image_name")
      .from("articles_image")
      .where("article_id", articleId);
    return result;
  };
  approveArticlePage = async (version_id:number, editor_id: number) => {
    try{
      let content = await this.knex('article_vote')
        .insert({
          version_id: version_id,
          editor_id: editor_id,
          is_approve: true 
        })
      let version = await this.knex('articles_version')
      .where('id',version_id)
          .update({
            editor_id: editor_id,
            approved_at: this.knex.fn.now(),
        })
        return true
    }catch(err:any){
      console.log(err.message);
    }
  };
  
  HomePageOverview = async () => {
    const currentNews = await this.knex
      .select(
        "articles_version.id",
        "articles_version.title",
        "articles_version.content",
        "articles_version.ref_site",
        "articles_version.approved_at",
        "editors.username as editor",
        // "articles_image.image_idx"
      )
      .from("articles_version")
      // .max("articles_version.id")
      // .groupBy("articles_version.id")
      .innerJoin("articles", "article_id", "articles.id")
      .innerJoin("users", "articles.author_id", "users.id")
      .innerJoin("editors", "articles_version.editor_id", "editors.id")
      // .innerJoin("articles_image", "articles_version.article_id", "articles_image.id")
      // .union([this.knex.select("*").from("articles_image")])
      .whereNotNull("articles_version.approved_at")
      .whereIn(
        "articles_version.id",
        this.knex
          .max("articles_version.id")
          .from("articles_version")
          .where("articles_version.article_id", this.knex.raw("articles.id"))
      )
    // .andWhereRaw(`

    // articles_version.id in (

    //   select max articles_version.id from articles_version
    //   where
    // )

      // `)
      // .limit(10);
    return {currentNews};
  };
}
function whereIn(arg0: string, arg1: Knex.QueryBuilder<{}, ({ [k: string]: any; } | {
  _base: unknown; _hasSelection: boolean; // `)
  // `)
  _keys: string; _aliases: {}; _single: boolean; _intersectProps: { [k: string]: any; }; _unionProps: unknown;
})[]>) {
  throw new Error("Function not implemented.");
}

