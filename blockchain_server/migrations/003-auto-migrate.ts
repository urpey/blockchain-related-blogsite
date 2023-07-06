import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('reward_articles', table => {
    table.specificType('amount', 'real').notNullable()
  })

  if (!(await knex.schema.hasTable('vote'))) {
    await knex.schema.createTable('vote', table => {
      table.increments('id')
      table.integer('version_id').unsigned().nullable().references('articles_version.id')
      table.integer('editor_id').unsigned().nullable().references('editors.id')
      table.boolean('is_approve').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('user_agent'))) {
    await knex.schema.createTable('user_agent', table => {
      table.increments('id')
      table.text('user_agent').notNullable().unique()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('view'))) {
    await knex.schema.createTable('view', table => {
      table.integer('version_id').unsigned().nullable().references('articles_version.id')
      table.integer('user_agent_id').unsigned().notNullable().references('user_agent.id')
      table.integer('user_id').nullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('view')
  await knex.schema.dropTableIfExists('user_agent')
  await knex.schema.dropTableIfExists('vote')
  await knex.schema.alterTable('reward_articles', table => {
    table.dropColumn('amount')
  })
}
