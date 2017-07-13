const knex = require('./knex');


module.exports = {
	getAllBooks() {
		return knex('books').then(books => {
			return Promise.all(
				books.map(book => {
					book.authors = [];
					return knex('book_author').where('book_id', book.id).select('author_id')
					.then(authors => {
						// console.log('authors');
						// console.log(authors);
						if(authors.length < 1) {
							// console.log(book);
							return book;
						} else {
						return Promise.all(
							authors.map(author => {
								return knex('authors').where('id', author.author_id).first().then(result => {
									book.authors.push(result)
									return book;
								})
							})
						)}
					});
				})
			)
		}).then(books => {
			return books.map(book => {
				return book[0] ? book[0] : book;
			});
		});
	},
	getBooks() {
		return knex('books');
	},
	createNewBook(book) {
		return knex('books').insert(book, '*');
	},
	getBookAuthor(book_author) {
		return knex('book_author').where(book_author);
	},
	createBookAuthor(book_author) {
		return knex('book_author').insert(book_author, '*');
	},
	getOneBook(id) {
		return knex('books').where('id', id).then(books => {
			return Promise.all(
				books.map(book => {
					book.authors = [];
					return knex('book_author').where('book_id', book.id).then(relations => {
						// console.log(author);
						if(relations.length < 1) {
							return book;
						} else {
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
						}
					});
				})
			)
		}).then(book => {
			// console.log(book);
			return book[0][0] ? book[0][0] : book[0];
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
					return knex('book_author').where('author_id', author.id).then(relations => {
						// console.log(author);
						if(relations.length < 1) {
							return author
						} else {

							// console.log(author);
							return knex('book_author').where('author_id', author.id).select('book_id')
							.then(books => {
								// console.log(author);
								return Promise.all(
									books.map(book => {
										return knex('books').where('id', book.book_id).first().then(result => {
											author.books.push(result)
											// console.log(author);
											return author;
										})
									})
								)
							});
						}
					})
				})
			)
		}).then(authors => {
			return authors.map(author => {
				if(author.length > 0) {
					return author[0];
				} else
				return author;
			})
		});
	},
	getOneAuthor(id) {
		return knex('authors').where('id', id).then(authors => {
			return Promise.all(
				authors.map(author => {
					author.books = [];
					return knex('book_author').where('author_id', author.id).then(relations => {
						// console.log(author);
						if(relations.length < 1) {
							return author
						} else {
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
						}
					});
				})
			)
		}).then(author => {
			return author[0][0] ? author[0][0] : author [0];
		});
	},
	createAuthor(author) {
		return knex('authors').insert(author, '*');
	},
	deleteAuthor(id) {
		return knex('authors').where('id', id).del();
	},
	updateAuthor(id, author) {
		return knex('authors').where('id', id).update(author, '*');
	}
}
