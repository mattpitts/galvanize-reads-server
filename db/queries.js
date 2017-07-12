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
	},
	createNewBook(book) {
		return knex('books').insert(book, '*');
	},
	createBookAuthor(book_author) {
		return knex('book_author').insert(book_author, '*');
	},
	getBookById(id) {
		return knex('books').where('id', id).then(books => {
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
	// getBookById(id) {
	// 	return knex('books').where('id', id)
	// 		.join('book_author', 'books.id', '=', 'book_id')
	// 		.join('authors', 'book_author.author_id', '=', 'author.id');
	// }
}
