module.exports = {
	book(book) {
		if(typeof(book.title) != 'string' || book.title.trim() == '') { return false; }
		if(typeof(book.description) != 'string' || book.description.trim() == '') { return false; }
		if(typeof(book.genre) != 'string' || book.genre.trim() == '') { return false; }
		return true;
	},
	bookAuthor(book_author) {
		if(isNaN(book_author.author_id) || isNaN(book_author.book_id)) {
			return false;
		}
		return true;
	},
	author(author) {
		console.log(author);
		if(typeof(author.first_name) != 'string' || author.first_name.trim() == '') { return false; }
		if(typeof(author.last_name) != 'string' || author.last_name.trim() == '') { return false; }
		if(typeof(author.biography) != 'string' || author.biography.trim() == '') { return false; }
		console.log('valid author');
		return true;
	}
}
