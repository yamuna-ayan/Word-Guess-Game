const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const words = [
    "APPLE",
    "MANGO",
    "HOUSE",
    "WATER",
    "TRAIN"
];

let secretWord =
words[Math.floor(Math.random()*words.length)];

let attemptsLeft = 6;

app.post("/guess",(req,res)=>{

    const guess =
    req.body.guess.toUpperCase();

    if(guess === secretWord){

        return res.json({
            status:"WIN"
        });
    }

    attemptsLeft--;

    if(attemptsLeft <= 0){

        return res.json({
            status:"LOSE",
            word:secretWord
        });
    }

    res.json({
        status:"CONTINUE",
        attemptsLeft
    });

});

app.post("/restart",(req,res)=>{

    secretWord =
    words[Math.floor(Math.random()*words.length)];

    attemptsLeft = 6;

    res.json({
        message:"Game Restarted"
    });

});

app.listen(5000,()=>{

    console.log(
      "Server running on port 5000"
    );

});