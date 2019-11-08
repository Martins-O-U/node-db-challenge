
exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.text('description');
      table.boolean('completed').defaultTo(false).notNullable();
  })
  .createTable('resource', table => {
    table.increments();
    table.string('name', 255).notNullable();
    table.text('description')
  })
  .createTable('task', table => {
      table.increments();
      table.text('description').notNullable();
      table.text('notes');
      table.boolean('completed').defaultTo(false).notNullable();
      table
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')

  })
  .createTable('project_resource', table => {
      table.increments();
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')

      table
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resource')
        .onUpdate('CASCADE')
  })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resource')
        .dropTableIfExists('task')
        .dropTableIfExists('resource')
        .dropTableIfExists('projects')
  
};
