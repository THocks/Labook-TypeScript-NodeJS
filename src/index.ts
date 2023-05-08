import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRouter";
import { postRouter } from "./routes/postRouter";

const app = express();
app.use(cors());
app.use(express.json());
//Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
