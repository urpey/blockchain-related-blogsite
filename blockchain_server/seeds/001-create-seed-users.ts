import { Knex } from "knex";
import { hashPassword } from "../src/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("article_vote").del();
  await knex("other_vote").del();
  await knex("editor_vote").del();
  await knex("setting").del();
  await knex("setting_proposal").del();
  await knex("like_articles").del();
  await knex("reward_articles").del();
  await knex("save_articles").del();
  await knex("articles_image").del();
  await knex("articles_version").del();
  await knex("articles").del();
  await knex("editors").del();
  await knex.raw(`SELECT setval('"editors_id_seq"', (SELECT MAX(id) FROM users)+1);`);
  await knex("users").del();
  await knex.raw(`SELECT setval('"users_id_seq"', (SELECT MAX(id) FROM users)+1);`);
  let hashedPW = await hashPassword("admin");
  // Inserts seed entries
  await knex("users").insert([
    {
      id: 1,
      username: "admin",
      password_hash: hashedPW,
      email: "admin@1.com",
      icon:'https://i.redd.it/cfjfhl36mue61.jpg'

    },
    {
      id: 2,
      username: "EditorElon",
      password_hash: hashedPW,
      email: "dockeditor@1.io",

    },
    {
      id: 3,
      username: "EditorMusk",
      password_hash: hashedPW,
      email: "dockeditor@1.io",

    },
    {
      id: 4,
      username: "EditorAmber",
      password_hash: hashedPW,
      email: "dockeditor@1.io",

    },
  ]);
  await knex.raw(`SELECT setval('"users_id_seq"', (SELECT MAX(id) FROM users));`);

  await knex("editors").insert([
    { id: 1, users_id: 2, username: "EditorElon"},
    { id: 2, users_id: 3, username: "EditorMusk"},
    { id: 3, users_id: 4, username: "EditorAmber"},
  ]);

  await knex.raw(`SELECT setval('"editors_id_seq"', (SELECT MAX(id) FROM users));`);
}
