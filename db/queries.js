const knex = require('./knex');


module.exports = {

	getAllAuthors() {
		return knex('authors');
	},
	getAllBooksAuthors() {
		return knex('book_author');
	},
	getAllBooks() {
		return knex('books').then(books => {
			return Promise.all(
				books.map(book => {
					book.authors = [];
					return knex('book_author').where('book_id', book.id).select('author_id')
					.then(authors => {
						return Promise.all(
							authors.map(author => {
								return knex('authors').where('id', author.author_id).first().then(result => {
									book.authors.push(result)
									return book;
								})
							})
						)
					});
				})
			)
		}).then(books => {
			return parsedBooks = books.map(book => {
				return book[0];
			})
		});
	}
}
