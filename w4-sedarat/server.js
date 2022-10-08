import express from "express";
import { router as userRouter } from "./routes/user.js";
import { router as quizRouter } from "./routes/quiz.js";
import { router as historyRouter } from "./routes/history.js";
import { syncDatabase } from "./setupDb.js";
const PORT = 3000;
const app = express()

syncDatabase();

app.use(express.json())
app.use("/user",userRouter)
app.use("/quiz",quizRouter)
app.use("/history",historyRouter)

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})