
exports.up = function(knex, Promise) {
	return knex.schema.createTable('authors', (table) => {
		table.increments('id').primary();
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.text('biography');
		table.string('portrait_url');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('authors');
};
