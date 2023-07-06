import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('articles_version', table=>{
        table.dropColumn('image')
    })

    if (!(await knex.schema.hasTable('articles_image'))) {
        await knex.schema.createTable('articles_image', table => {
          table.increments('id')
          table.integer('article_id').notNullable().references('articles.id')
          table.string('image_name', 255).nullable()
          table.string('image_idx',20).nullable()
          table.timestamps(false, true)
        })
      }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('articles_version', table=>{
        table.text('image').nullable()
    })

    await knex.schema.dropTableIfExists('articles_image')
}

