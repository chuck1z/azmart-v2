const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const { EmailRounded } = require("@material-ui/icons");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "AZMart",
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == "") {
    res.send({ message: "Email cannot be empy" });
  } else {
    db.query(
      "INSERT INTO users (email, password) VALUES (?,?)",
      [email, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM  USERS WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong email or password!" });
      }
    }
  );
});

app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/getid", (req, res) => {
  const _id = req.body._id;
  // db.query("SELECT * FROM products WHERE _id = 1", (err, result) => {
  db.query("SELECT * FROM products WHERE _id = ?", [_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/api/getseller", (req, res) => {
  db.query("SELECT * FROM products WHERE seller = ?", [user], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/add", (req, res) => {
  const productName = req.body.productName;
  const category = req.body.category;
  const image = req.body.image;
  // const seller = req.body.seller;
  const price = req.body.price;
  const brand = req.body.brand;
  const description = req.body.description;
  db.query(
    "INSERT INTO products (name, category, image, price, brand, description) VALUES (?, ?, ?, ?, ?, ?)",
    [productName, category, image, price, brand, description],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/api/tracker", (req, res) => {
  const id = req.body.id;
  const user = req.body.user;
  db.query(
    "INSERT INTO tracker (productID) VALUES (?)",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`backend running @ http://localhost:${port}`);
});
