import * as express from "express";
import { Chat } from "./chat";

const router = express.Router({ caseSensitive: false });
const app = express.default();
const chat = new Chat();
//get fake

router.use(
  express.static(
    __dirname.slice(0, __dirname.search("controller")) + "\\view\\dist"
  )
);
router.use("/", (req, res) => {
  //cry about it
  req = req;
  res.sendFile("index.html");
});
app.use(router);
app.listen(8080);
