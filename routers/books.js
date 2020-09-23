const express = require("express");

const Books = require("../models/").books;
const { Router } = express;
const router = new Router();

router.get("/books/:id", async function getUserBooks(req, res, next) {
  console.log("VALUE OF ID", req.params.id);
  const Id = req.params.id;
  try {
    const getData = await Books.findByPk(Id);

    res.json(getData);
  } catch (e) {
    //next(e);
    console.log("error", e.message);
  }
});

// get books by userId
router.get("/bookselection/:userId", async (req,res,next) =>{
    try{
      const {userId}=req.params
      const allMessages = await Books.findAll({where :{userId : userId}})

      res.json(allMessages)
    }catch(error){
      next(error)
    }
})


router.post("/books", async (req, res) => {
  // console.log("reqeust body", req.body);
  try {
    const {
      name,
      author,
      description,
      category,
      language,
      link,
      imageUrl,
      userId,
    } = req.body;
    console.log("request added book testing values :", req.body);
    if (
      !name ||
      !author ||
      !description ||
      !category ||
      !language ||
      !link ||
      !imageUrl ||
      !userId
    ) {
      res.status(400).send("missing parameters");
    } else {
      // const hashedPassword = bcrypt.hashSync(password, 10);
      const event = await Books.create({
        name,
        author,
        description,
        category,
        language,
        link,
        imageUrl,
        userId,
      });
      res.json(event);
    }
  } catch (e) {
    console.log(e.message);
    // next(e);
  }
});

router.put("/bookselection/:userId", async (req, res) => {
  // console.log("reqeust body", req.body);
  try {
    const {  
      name,
      author,
      description,
      category,
      language,
      imageUrl,
      link,
      userId
    } = req.body;
    console.log("request testing values :", req.body);
    
    if ( 
      !name ||
      !author ||
      !description ||
      !category ||
      !language ||
      !imageUrl ||
      !link ||
      !userId
    ) {
      res.status(400).send("missing parameters");
    } else {
      // const hashedPassword = bcrypt.hashSync(password, 10);
      const event = await Books.patch({
        name,
        author,
        description,
        category,
        language,
        imageUrl,
        link,
        userId,
      });
      res.json(event);
    }
  } catch (error) {
    console.log(error.message);
    // next(e);
  }
});

module.exports = router;
