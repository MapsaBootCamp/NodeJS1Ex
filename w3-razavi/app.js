import express from "express";
const app = express();

import usersRouter from "./routes/users.js";
import quizRouter from "./routes/quiz.js";
import historyRouter from "./routes/history.js";

const PORT = 3000;

app.use(express.json());
app.use("/user", usersRouter);
app.use("/quiz", quizRouter);
app.use("/history", historyRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

export default app;
