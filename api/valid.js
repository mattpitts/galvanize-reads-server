module.exports = {
	book(book) {
		if(typeof(book.title) != 'string') { return false; }
		if(typeof(book.description) != 'string') { return false; }
		if(typeof(book.genre) != 'string') { return false; }
		return true;
	},
	bookAuthor(book_author) {
		if(isNaN(book_author.author_id) || isNaN(book_author.book_id)) {
			return false;
		}
		return true;
	}
}
