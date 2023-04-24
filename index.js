import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'node:module';

const port = 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    // res.send(`<h1> Welcome to our shop!</h1>`);
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/user", (req, res) => {
  const name = req.query?.name || "User";
  const surname = req.query?.surname || "";
  const message = `Hello ${name} ${surname}!!`;
  res.render('user', {message});

  //  res.send(`<h1>Hello ${name} ${surname}</h1>`);
//   res.send(`<h1>${message}</h1>`);
});

app.get("/product", (req, res) => {
    const title = req.query?.title || "Title";
    const price = req.query?.price || "XXXX";
    
    res.render('product', {title: title, price: price});
    // res.send(`<h1>${title}</h1> <h2>For just ${price}</h2>`);
    
})
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
