const express = require("express");
const User = require("../models/").user;
const Books = require("../models/").books;
const { Router } = express;
const router = new Router();
const bcrypt = require ('bcrypt')

const {toJWT} = require('../auth/jwt')

router.get("/user/:id", async function getUserBooks(req, res, next) {
  console.log("VALUE OF ID", req.params.id);
  const Id = req.params.id;
  try {
    const getData = await User.findByPk(Id, {
      include: [Books],
      order: [[Books, "createdAt", "DESC"]],
    });

    res.json(getData);
  } catch (e) {
    //next(e);
    console.log("error", e.message);
  }
});



// create a new user with Signup

router.post('/signup', async(req,res,next) =>{
  try{

    const {email,password,name}=req.body

    if(!password || !email || !name){
      res.status(400).send("missing some user parameters")
  }else{
    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser= await User.create({
        email,
        password : hashedPassword,
        name,
    })
    res.send(newUser)
  }
  }catch(error){
    next(error)
  }
})

module.exports = router;
