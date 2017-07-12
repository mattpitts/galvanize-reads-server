const queries = require('../db/queries');
const express = require('express');
const valid = require('./valid');

const router = express.Router();


router.get('/books', (req,res,next) => {
	queries.getAllBooks().then(books => {
		console.log(books);
		res.json(books);
	});
});


router.get('/authors', (req,res,next) => {
	queries.getAllAuthors().then(authors => {
		res.json(authors);
	})
});


router.get('/books/authors', (req,res,next) => {
	queries.getAllBooksAuthors().then(books => {
		res.json(books);
	})
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

module.exports = router;
