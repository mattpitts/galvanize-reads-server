const knex = require('./knex');


module.exports = {
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
	},
	deleteBook(id) {
		return knex('books').where('id', id).del();
	},
	deleteBookAuthor(bookId, authorId) {
		return knex('book_author').where({book_id: bookId, author_id: authorId}).del('*');
	},
	updateBook(id, book) {
		return knex('books').where('id', id).update(book, '*');
	},
	getAllAuthors() {
		return knex('authors').then(authors => {
			return Promise.all(
				authors.map(author => {
					author.books = [];
					return knex('book_author').where('author_id', author.id).select('book_id')
					.then(books => {
						return Promise.all(
							books.map(book => {
								return knex('books').where('id', book.book_id).first().then(result => {
									author.books.push(result)
									return author;
								})
							})
						)
					});
				})
			)
		}).then(authors => {
			return parsedAuthors = authors.map(author => {
				return author[0];
			})
		});
	},
	getOneAuthor(id) {
		return knex('authors').where('id', id).then(authors => {
			return Promise.all(
				authors.map(author => {
					author.books = [];
					return knex('book_author').where('author_id', author.id).select('book_id')
					.then(books => {
						return Promise.all(
							books.map(book => {
								return knex('books').where('id', book.book_id).first().then(result => {
									author.books.push(result)
									return author;
								})
							})
						)
					});
				})
			)
		}).then(authors => {
			return parsedAuthors = authors.map(author => {
				return author[0];
			})
		});
	},
	createAuthor(author) {
		console.log(author);
		return knex('authors').insert(author, '*');
	}
}
