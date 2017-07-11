
exports.up = function(knex, Promise) {
	return knex.schema.createTable('books', (table) => {
		table.increments('id').primary();
		table.string('title').notNullable();
		table.string('genre');
		table.text('description');
		table.string('cover_url');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('books');
};
