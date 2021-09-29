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
         const formattedItems = allBooks.map(item => ({ name: item.name , author: item.author,  type: item.type, price: item.price }));
//        console.log("hello", formattedItems);
        res.send(formattedItems);
      })
      .catch((error) => res.send(`Error on ${req.path} - ${error}`));
  }); 
 
  
  router.get('/:type', (req, res) => {
    const type = req.params.type;
    const formatItems = items => items.map(item => ({ name: item.name, author: item.author, type: item.type, price: item.price}))
    if(type === 'fiction' || type === 'nonfiction') {
      Book
        .find({ type: type })
        .then(desiredItems => {
          res.send(formatItems(desiredItems))
        })
        // Error handling
        .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
    }
  })

  router.get('/:name', (req, res) => {
    const name = req.params.name;
    console.log(name)
    const formatItems = items => items.map(item => ({ name: item.name, author: item.author, type: item.type, price: item.price}))
    // if(name) {
      Book
        .find({ name: name })
        .then(desiredItems => {
          res.send(formatItems(desiredItems))
        })
        // Error handling
        .catch(error => res.send(`Error - ${JSON.stringify(error)}`));

  })

router.post('/', (req, res) => {
  const body = req.body;
  
  const newItem = new Book({ name: body.name, author: body.author,  price: body.price, type: body.type});
  
  // save to mongodb
  newItem
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
      book.name = body.name ;
      book.author = body.author;
      book.price = body.price;
      book.type = body.type;
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