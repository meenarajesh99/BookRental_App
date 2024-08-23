const { getMaxListeners } = require("../models/book")

const BOOKS = [
{
    
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: '3.99',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41ybG235TcL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    category: 'Fiction',
    countInStock: 10,
   
},
{
   
    title: 'Billy Summers',
    author: 'Stephen King',
    price: '3.99',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51RY7+RDt+L._SY344_BO1,204,203,200_.jpg',
    category: 'Fiction',
    countInStock: 10,
    
},
{
    
    title: 'Enemy at the Gates',
    author: 'Vince Flynn',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/71wIX869Z0S._AC_UY218_.jpg',
    category: 'Fiction',
    countInStock: 10,
    
},
{
  
    title: 'Apples Never Fall',
    author: 'Liane Moriarty',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/81ZV+TzlboL._AC_UY218_.jpg',
    category: 'Fiction',
    countInStock: 10,
    
},
{
  
    title: 'The Wish',
    author: 'Nicholas Sparks',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/81dAl0oqP9L._AC_UY218_.jpg',
    category: 'Fiction',
    countInStock: 10,
    
},
{
    
    title: 'Behave',
    author: 'Robert M.Sapolsky',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/81GTBUNTkqL._AC_UY218_.jpg',
    category: 'NonFiction',
    countInStock: 10,
   
},
{
   
    title: 'Mans Search for Meaning',
    author: 'Viktor E.Frankl',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/81QtGH9r1lL._AC_UY218_.jpg',
    category: 'NonFiction',
    countInStock: 10,
    
    
    
},
{
   
    title: 'A Promised Land',
    author: 'Barack Obama',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/81NI6sqvvkL._AC_UY218_.jpg',
    category: 'NonFiction',
    countInStock: 10,
    
},
{
   
    title: 'Talking to Strangers',
    author: 'Malcolm Gladwell',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/718yLJJH0vL._AC_UY218_.jpg',
    category: 'NonFiction',
    countInStock: 10,
    
},
{
  
    title: 'The Code Breaker',
    author: 'Walter Isaacson',
    price: '3.99',
    imageUrl: 'https://m.media-amazon.com/images/I/71AKlX+-zuL._AC_UY218_.jpg',
    category: 'NonFiction',
    countInStock: 10
    
}
]
module.exports = BOOKS;