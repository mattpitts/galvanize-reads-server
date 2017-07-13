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
	queries.getOneBook(req.params.id).then(book => {
		res.json(book);
	});
});


router.get('/authors', (req,res,next) => {
	queries.getAllAuthors().then(authors => {
		res.json(authors);
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
		queries.getBookAuthor(req.body).then(author => {
			console.log(author);
			if(author.length > 0) {
				console.log('exists');
				res.json(author);
			} else {
				console.log('create');
				queries.createBookAuthor(req.body).then(book_author => {
					res.json(book_author);
				});
			}
		})

	} else {
		next(new Error('Ivalid association'));
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
	if(valid.author(req.body)) {
		console.log('asdasd');
		queries.createAuthor(req.body).then(response => {
			res.json(response);
		});
	}
});

router.delete('/authors/:id', (req,res,next) => {
	queries.deleteAuthor(req.params.id).then(response => {
		res.json(response);
	});
});

router.put('/authors/:id', (req,res,next) => {
	queries.updateAuthor(req.params.id, req.body).then(response => {
		res.json(response);
	});
});

module.exports = router;
