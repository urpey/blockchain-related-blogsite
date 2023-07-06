import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', table => {
      table.increments('id')
      table.string('username', 64).notNullable().unique()
      table.string('password_hash', 60).notNullable()
      table.string('email', 64).notNullable()
      table.string('icon', 255).nullable()
      table.string('detail', 255).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('editors'))) {
    await knex.schema.createTable('editors', table => {
      table.increments('id')
      table.integer('users_id').unsigned().notNullable().references('users.id')
      table.string('username', 64).notNullable()
      table.timestamp('approved_at').notNullable().defaultTo(knex.fn.now())
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('articles'))) {
    await knex.schema.createTable('articles', table => {
      table.increments('id')
      table.integer('author_id').unsigned().notNullable().references('users.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('articles_version'))) {
    await knex.schema.createTable('articles_version', table => {
      table.increments('id')
      table.integer('article_id').unsigned().notNullable().references('articles.id')
      table.integer('editor_id').unsigned().nullable().references('editors.id')
      table.string('title', 255).notNullable()
      table.string('ref_site', 255).nullable()
      table.text('content').notNullable()
      table.text('image').nullable()
      table.timestamp('approved_at').nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('like_articles'))) {
    await knex.schema.createTable('like_articles', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('article_id').unsigned().notNullable().references('articles.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('reward_articles'))) {
    await knex.schema.createTable('reward_articles', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('article_id').unsigned().notNullable().references('articles.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('save_articles'))) {
    await knex.schema.createTable('save_articles', table => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id')
      table.integer('article_id').unsigned().notNullable().references('articles.id')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('save_articles')
  await knex.schema.dropTableIfExists('reward_articles')
  await knex.schema.dropTableIfExists('like_articles')
  await knex.schema.dropTableIfExists('articles_version')
  await knex.schema.dropTableIfExists('articles')
  await knex.schema.dropTableIfExists('editors')
  await knex.schema.dropTableIfExists('users')
}
