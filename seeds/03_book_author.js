
const book_author = require('./seeds-data/book_author');

exports.seed = function(knex, Promise) {
  	return knex.raw('TRUNCATE book_author RESTART IDENTITY CASCADE;').then(function () {
    	return knex('book_author').insert(book_author);
	});
};
