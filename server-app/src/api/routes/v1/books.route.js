const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const express = require('express');

const bcrypt = require('bcrypt');

/** Source code imports */
// Mongoose models
const Book = require('../../models/book');


// create new express router
const router = express.Router();

//const formattedItems = allBooks.map(item => ({ name: item.name , author: item.author,   price: item.price, type: item.type }));

 router.get("/", (req, res) => {
   
    Book
        .find()
        .then((allBooks) => {
         const formattedBooks = allBooks.map(book=> ({ title: book.title , author: book.author, price: book.price, imageUrl: book.imageUrl, category: book.category }));
    //    console.log("hello", formattedBooks);
        res.send(formattedBooks);
      })
      .catch((error) => res.send(`Error on ${req.path} - ${error}`));
  }); 
 
  
  /* router.get('/:type', (req, res) => {
    const type = req.params.type;
    const formatBooks = books => books.map(item => ({ title: book.title, author: book.author, type: book.type, price: book.price, image: book.image}))
    if(type === 'fiction' || type === 'nonfiction') {
      Book
        .find({ type: type })
        .then(desiredBooks => {
          res.send(formatBooka(desiredBooks))
        })
        // Error handling
        .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
    }
  }) */

  router.get('/:title', (req, res) => {
    const title = req.params.title;
    console.log(title)
    const formatBooks = books => title.map(book => ({ title: book.title, author: book.author, category: book.category, price: book.price, image: book.image}))
    // if(name) {
      Book
        .find({ title: title })
        .then(desiredBooks => {
          res.send(formatBooks(desiredBooks))
        })
        // Error handling
        .catch(error => res.send(`Error - ${JSON.stringify(error)}`));

  })

router.post('/', (req, res) => {
  const body = req.body;
  
  const newBook = new Book({ title: body.title, author: body.author,  price: body.price, category: body.category, image: body.image});
  
  // save to mongodb
  newBook
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} Book added!`))
    // Error handling
    .catch(error =>{
      res
      .status(400)
      .send(`Error - unable to create Book: ${error}`);
  });
});

router.put('/books/:id', (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(id);
  if (!body || !body.content) {
    res
      .status(400)  
      .send(`Error, bad body: ${body}`);
  }
  Book
      .findById({id})
      .then(book => {
      book.title = body.title ;
      book.author = body.author;
      book.price = body.price;
      book.category = body.category;
      book.image = body.image;
      book
      .save()
      .then(data => res.send(`${data}`));
  })
  .catch(error => res.status(400).send(`Error updating: ${error}`));
});

router.delete('/book/:id', (req, res) => {
  const id = req.params.id;
  console.log( id);
  Book
    .findByIdAndDelete(id)
    .then(msg => res.send(`Successfully deleted ${msg}`))
    .catch(error => res.status(400).send(`Error deleting ${error}`));
});



/* router.delete('/:name', async(req, res, next) => {
    const name = req.params.name
    try{

      const result = await User.findOneAndDelete({name});
      res.send(result);
    }
    catch(err){
        console.log(err.message);
    }
  });
 */

    
        
    
  
  
  module.exports = router;