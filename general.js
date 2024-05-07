const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let username=req.body.username;
  let password=req.body.password;
  if (username && password)
  {
  
    if (!isValid(username)){
        users.push({"username": username, "password" : password});
        return res.status(200).json({message: "User registred successfully !"});
    }
    else 
    {
        return res.status(404).json({message: "User already exists !"});

    }
} else 
{
    return res.status(404).json({message: "Unable to register user !"});
}
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn=req.params.isbn;
  if (isbn){
  res.send(JSON.stringify(books[isbn]));
}
else {
  return res.status(404).json({message: "ISBN not found"});}
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author=req.params.author;
  for (let book in books)
  {
    if (books[book].author===author){
        res.send(JSON.stringify(books[book]));


    }
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title=req.params.title;
  for (let book in books)
  {
    if (books[book].title===title){
        res.send(JSON.stringify(books[book]));


    }
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn=req.params.isbn;
  if (isbn)
  {
    res.send(books[isbn].reviews);
  }

  //return res.status(300).json({message: "Yet to be implemented"});
});

//get the books available in the shop using promise

public_users.get('/',function (req, res) {
    //Write your code here
    let promise = new Promise ((resolve,reject)=>{
        resolve.send(JSON.stringify(books,null,4))
        

    })
    promise.then(() => console.log("Book list has been sent successfully"));
      });
  
// Get book details based on ISBN using promise 
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    let isbn=req.params.isbn;
    let promise = new Promise((resolve,reject)=>
    {
        if (isbn){
            resolve(res.send(JSON.stringify(books[isbn])));
          }
          else {
            return resolve(res.status(404).json({message: "ISBN not found"}));}
    })
    promise.then(() => console.log("The details of the book based on the requested ISBN has been sent successfully"));
    
    
   });

// Get book details based on author using promises
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    let author=req.params.author;
    let promise= new Promise(()=>{
    for (let book in books)
    {
      if (books[book].author===author){
          resolve(res.send(JSON.stringify(books[book])));
  
  
      }
    } })
    promise.then(()=> console.log("The list of books with the requested Author has been sent successfully"));
    //return res.status(300).json({message: "Yet to be implemented"});
  });

// Get all books based on title using Promises
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    let title=req.params.title;
    let promise=new Promise((resolve,reject)=>{

        for (let book in books)
        {
          if (books[book].title===title){
              res.send(JSON.stringify(books[book]));
      
      
          }
        }
    })
    promise.then(()=> console.log("Books with the requested title has been sent successfully") );
    
    //return res.status(300).json({message: "Yet to be implemented"});
  });
  
module.exports.general = public_users;
