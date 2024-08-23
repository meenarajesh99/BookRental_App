const mongoose = require('mongoose');

/**
 * Mongoose Model for our MongoDB Collection
 * See:
 *  https://mongoosejs.com/docs/models.html
 *  https://docs.mongodb.com/manual/core/databases-and-collections/#collections
 */

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    // This prevents duplicate documents w/the exact same info from being created for this model.
    unique: true,
    required: true,
  },
  author: {
      type: String,
      required: true,
  },
  
  
  price: {
      type: Number,
      required: true,

  },

  imageUrl: {
    type: String,
    required: true,
  },
  
  category:{
    type:String,
    required: true,
  },
 
countInStock: {
    type: 'Number',
    required: true
}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
