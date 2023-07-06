import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('vote')
  
  await knex.schema.alterTable('editors', table => {
    table.timestamp('approved_at').nullable().alter()
  })

  if (!(await knex.schema.hasTable('article_vote'))) {
    await knex.schema.createTable('article_vote', table => {
      table.increments('id')
      table.integer('version_id').unsigned().notNullable().references('articles_version.id')
      table.integer('editor_id').unsigned().notNullable().references('editors.id')
      table.boolean('is_approve').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('editor_vote'))) {
    await knex.schema.createTable('editor_vote', table => {
      table.increments('id')
      table.integer('editor_id').unsigned().notNullable().references('editors.id')
      table.integer('target_id').unsigned().notNullable().references('editors.id')
      table.boolean('is_approve').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('setting_proposal'))) {
    await knex.schema.createTable('setting_proposal', table => {
      table.increments('id')
      table.text('key').notNullable()
      table.text('value').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('setting'))) {
    await knex.schema.createTable('setting', table => {
      table.increments('id')
      table.text('key').notNullable()
      table.text('value').notNullable()
      table.integer('proposal_id').unsigned().notNullable().references('setting_proposal.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('other_vote'))) {
    await knex.schema.createTable('other_vote', table => {
      table.increments('id')
      table.integer('proposal_id').unsigned().notNullable().references('setting_proposal.id')
      table.integer('editor_id').unsigned().notNullable().references('editors.id')
      table.boolean('is_approve').notNullable()
      table.timestamps(false, true)
    })
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('other_vote')
  await knex.schema.dropTableIfExists('setting')
  await knex.schema.dropTableIfExists('setting_proposal')
  await knex.schema.dropTableIfExists('editor_vote')
  await knex.schema.dropTableIfExists('article_vote')
  await knex.schema.alterTable('editors', table => {
    table.dropColumn('approved_at')
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
}


