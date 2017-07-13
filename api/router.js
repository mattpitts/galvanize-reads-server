const queries = require('../db/queries');
const express = require('express');
const valid = require('./valid');

const router = express.Router();


router.get('/books', (req,res,next) => {
	queries.getAllBooks().then(books => {
		res.json(books);
	});
});

router.get('/books/:id', (req,res,next) => {
	queries.getBookById(req.params.id).then(book => {
		res.json(book);
	});
});


router.get('/authors', (req,res,next) => {
	queries.getAllAuthors().then(authors => {
		res.json(authors);
	})
});


router.get('/books_authors', (req,res,next) => {
	queries.getAllBooksAuthors().then(books => {
		res.json(books);
	});
});

router.post('/books', (req,res,next) => {
	if(valid.book(req.body)) {
		queries.createNewBook(req.body).then(book => {
			res.json(book);
		});
	}
});


router.post('/books/authors', (req,res,next) => {
	if(valid.bookAuthor) {
		queries.createBookAuthor(req.body).then(book_author => {
			res.json(book_author);
		});
	}
});


router.delete('/books/:id', (req,res,next) => {
	queries.deleteBook(req.params.id).then(response => {
		res.json(response);
	});
});


router.delete('/books/:bookId/authors/:authorId', (req,res,next) => {
	queries.deleteBookAuthor(req.params.bookId, req.params.authorId).then(response => {
		res.json(response);
	});
});


router.put('/books/:id', (req,res,next) => {
	queries.updateBook(req.params.id, req.body).then(response => {
		res.json(response);
	});
})


router.get('/authors', (req,res,next) => {
	queries.getAllAuthors().then(response => {
		res.json(response);
	});
});

router.get('/authors/:id', (req,res,next) => {
	queries.getOneAuthor(req.params.id).then(response => {
		res.json(response);
	});
});

router.post('/authors', (req,res,next) => {
	queries.createAuthor(req.body).then(response => {
		res.json(response);
	});
});

module.exports = router;
