const express = require("express");
const bodyParser = require("body-parser");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/authentication");
const sqlite3 = require("sqlite3").verbose();
const { logMiddleware } = require("./utils/middlewares");
const app = express();
const parser = bodyParser.json();
const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run("CREATE TABLE my_table (id, name)");
});
app.use(parser);
app.use(logMiddleware);
app.use(products);
app.use(users);
app.use(auth);

app.get("/", (request, response) => {
  db.all("SELECT * FROM my_table", [], (error, data) => {
    response.json(data);
  });
});
app.post("/", (request, response) => {
  const { name } = request.body;

  db.all("SELECT * FROM my_table", [], (err, rows) => {
    if (err) {
      response.status(500).json({ error: err.message });
    } else {
      const filtered_row = rows.filter((data) => data.name === name);
      if (filtered_row.length > 0) {
        response
          .status(400)
          .json({ error: "data with given name already exists" });
        return;
      } else
        db.run(
          "INSERT INTO my_table (id, name) VALUES (?, ?)",
          [rows.length + 1, name],
          (err) => {
            if (err) {
              response.status(500).json({ error: err.message });
            } else {
              response.json({ result: "Data inserted successfully" });
            }
          }
        );
    }
  });
});

app.listen(3001, () => {
  console.log("Hi! i am fakestore api and i am on 3001 port");
});
