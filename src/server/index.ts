import express from "express";
import compression from "compression";
import SSR from "./ssr";

const app = express();

app.use(compression());
app.use("/bundle", express.static(`${__dirname}/../client`));
app.get("/*", SSR);

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
