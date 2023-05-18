const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sampledb",
});

//****** creating database
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");

//   con.query("CREATE DATABASE sampledb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// })

//********creating tables
//   var sql = "CREATE TABLE item (id VARCHAR(20), title VARCHAR(50), body VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });

//******inserting data into tables
// var sql = "INSERT INTO item (id, title, body) VALUES (1, 'Title 1', 'Body 1'),(2, 'Title 2', 'Body 2'),(3, 'Title 3', 'Body 3'),(4, 'Title 4', 'Body 4')"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });

con.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected with App...");
});

/**
 * Get All Items
 *
 * @return response()
 */
app.get("/api/item", (req, res) => {
  let sqlQuery = "SELECT * FROM item";

  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
    app.get('/api/item/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM item WHERE id=" + req.params.id;

    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

/**
 * Creating New Item
 *
 * @return response()
 */
app.post("/api/item", (req, res) => {
  let data = { id: req.body.id, title: req.body.title, body: req.body.body };

  let sqlQuery = "INSERT INTO item SET ?";

  let query = con.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

var fs = require("fs");

var http = require("http");
var fs = require("fs");
http
  .createServer(function (req, res) {
    fs.readFile("form.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);

/**
 * Updating Item
 *
 * @return response()
 */
app.put('/api/item/:id',(req, res) => {
    let sqlQuery = "UPDATE item SET title='"+req.body.title+"', body='"+req.body.body+"' WHERE id="+req.params.id;
    let query = con.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });



/**
 * Deleting Item
 *
 * @return response()
 */
app.delete("/api/item/:id", (req, res) => {
  let sqlQuery = "DELETE FROM item WHERE id=" + req.params.id + "";
  let query = con.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

/*
Server listening*/
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
