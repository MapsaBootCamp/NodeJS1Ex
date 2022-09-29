const express = require("express");
const app = express()

const path = require('path');

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/../html/index.html'));    
    // res.sendFile('../html/index.html');
    // const a = window.getElementsByTagName("body").innerHTML = '<a href="#">go to quiz page</a>'
    // res.send("a")
})

const userRouter = require("./routes/user")
app.use("/user",  userRouter)

const quizRouter = require("./routes/quiz")
app.use("/quiz",  quizRouter)
// app.use("/quiz", (req, res) => {res.sendFile(path.join(__dirname+'/../html/quiz.html')); },  quizRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listen on ${PORT}`)
})