const queries = require('../db/queries');
const express = require('express');

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


router.get('/books_authors', (req,res,next) => {
	queries.getAllBooksAuthors().then(books => {
		res.json(books);
	})
});

router.post('/books', (req,res,next) => {
	queries.createNewBook(req.body).then(book => {
		res.json({
			message: "Success!",
			book
		});
	});
});

module.exports = router;
