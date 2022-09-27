const exp = require("express")
const userRouter = require("./Routes/user.js")
const quizRouter = require("./Routes/quiz.js")
const app = exp()
app.use(exp.json())
app.use("/users",userRouter)
app.get("/",(req,res)=>{
    res.json({"message":"Welcome"})
})
















app.listen(8080,()=>{
    console.log("server is listening on port 8080")
})