const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken')
const express = require('express');

const bcrypt = require('bcrypt');

/** Source code imports */
// Mongoose models
const User = require('../../models/user');


// create new express router
const router = express.Router();



router.get('/', (req, res) => {
  
  User
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()     
    .then(allUsers => {
      const formattedItems = allUsers.map(item => ({ username: item.username, email: item.email, password: item.password}));
      res.send(formattedItems);
    })
    .catch(error => res.send(`Error on ${req.path} - ${error}`));
})


/* router.get('/:username', (req, res) => {
  const username = req.params.username;
  console.log(username)
  const formatItems = items => items.map(item => ({ username: item.username, email: item.email, password: item.password }))
    User
      .find({ username:username })
      .then(desiredItem => {
      res.send(formatItems(desiredItem))
      })
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
 

}) */
/********************************************************************************* */

//creating a new user
// router.post('/', (req, res) => {
//   const body = req.body;

//   // create mongoose user model instance. we can then save this to mongodb as a document
//   const newItem = new User({ username: body.username, email: body.email, password: body.password });
  
//   // save to mongodb
//   newItem
//     .save()
//     .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
//     // Error handling
//     .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} user. Err is ${JSON.stringify(error)}`));
// }) 

/*************************************************************************************** */
//creating a new user with username in the body

router.post('/', async(req, res) => {
  const body = req.body
  const saltRounds = 10
  bcrypt.hash(body.password, saltRounds,(err,passwordHash)=>{
  // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
   const newItem = new User({ username: body.username, password: passwordHash, email: body.email })
  newItem
    .save()
    .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
    // Error handling
    .catch(error => res.send(`ERROR: Unable to create ${JSON.stringify(req.body)} User. Err is ${JSON.stringify(error)}`))
  })})

  /****************************************************************************************** */
  //creating a new user or checking a user to confirm the hashed password 
  router.post('/auth/login', async(req, res) => 
     {
      const body = req.body
      const username = req.body.username
      const password=req.body.password
      
      console.log(username)
      const formatItems = items => items.map(item => ({ username: item.username, email: item.email }));
      
      const user = await User.findOne({username:username})
      console.log(password);
      const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
      }
      
    
      const userForToken = {
        id: user._id,
        username: user.username,
        
      }
   //   console.log(process.env.SECRET)
      const token = jwt.sign(userForToken,'sunnyside');
    //  console.log(token);

    res
      .status(200)
      .send({ token, username: user.username })
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
      
    });
    
   /****************************************************************************************** */ 
  
    // create mongoose user model instance. we can then save this to mongodb as a document
  //   const newItem = new User({ username: body.username, email: body.email, password: body.password });
    
  //   // save to mongodb
  //   newItem
  //     .save()
  //     .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
  //     // Error handling
  //     .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} user. Err is ${JSON.stringify(error)}`));
 //  }) 
 /********************************************************************************************** */ 
//creating a new user with username in the url,and username with password in the json body, password will be hashed in the DB

 /*  router.post('/:username', (req, res) => {
     const body = req.body
     console.log(body)
    const saltRounds = 10
    bcrypt.hash(body.password, saltRounds,(err,passwordHash)=>{
    
        // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
     const newItem = new User({ username: body.username,  email: body.email,password: passwordHash })
    newItem
      .save()
      .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
      // Error handling
      .catch(error => res.send(`ERROR: Unable to create ${JSON.stringify(req.body)} User. Err is ${JSON.stringify(error)}`))  
      
    })});
 */
  /*********************************************************************************************** */
//deleting a user
/* router.delete('/:username', async(req, res, next) => {
    const username = req.params.username
    try{

       const result = await User.findOneAndDelete({username});
       res.send(result);
    }
    catch(err){
        console.log(err.message);
    }
   */
 
/**************************************************************************************************** */
  //updating the username
  router.put('/:username', async(req, res, next) =>{
   
     const username= req.params.username
     const newpassword = req.body
     const option = {new:true}
     console.log(username)
     // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
     try{
     const newItem =  await User.findOneAndUpdate({username},newpassword,option)
     res.send(newItem)
     }
     catch(error){
       console.log(error)
     }
})


//});
module.exports = router;