var data = require("./excelData.js").companyData;
const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root1234",
  database: "Chanacvlebebi",
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

// Create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE Chanacvlebebi";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Database created");
    console.log(result);
  });
});
// Create Table
app.get("/companies", (req, res) => {
  let sql =
    "CREATE TABLE companies (id int NOT NULL AUTO_INCREMENT, SID int, LongName varchar(255), TaxID1 int, area varchar(255), Location varchar(255), farea varchar(255), FLocation varchar(255), Activity_code varchar(255), Activity_name varchar(255), LegalFormID int, Phone int, HeadFname varchar(255), HeadLname varchar(255), Email varchar(255), Web varchar(255), sms varchar(255), TaxEmail varchar(255), TaxPhone int, user_id int, Strata1 int,Strata2 int, Strata3 varchar(255), Strata varchar(255), Status_Sampling varchar(255), Status_Result varchar(255), PRIMARY KEY (id));";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Table created");
    console.log(result);
  });
});

//Insert into Table

app.get("/addCompany", (req, res) => {
  let sql = "INSERT INTO companies SET ?";
  data.map((item) => {
    let query = db.query(sql, item, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("company 1 added");
    });
  });
});

// select
app.get("/companiesSelect", (req, res) => {
  let sql = "Select * from companies";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

//get with optional parametres
app.get("/itemSelect/:id?", (req, res) => {
  const { id } = req.params;
  if (id) {
    let sql = `Select * from companies Where SID like '${id}' `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send(`missing parametres`);
  }
});

//get similar companies with strata
app.get("/strataSelect/:Strata?/:sid?", (req, res) => {
  const Strata = req.params["Strata"];
  const sid = req.params["sid"];
  if (Strata && sid) {
    let sql = `Select * from companies Where Status_Sampling like 0 && Strata like '${Strata}' && SID not like ${sid} `;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send(`missing parametres`);
  }
});

//update with input
app.post("/updateDB", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;
  const Status_Result = req.body.Status_Result;
  console.log(SID, Status_Sampling, Status_Result);

  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}', Status_Result = '${Status_Result}' WHERE SID like '${SID}'`;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen("4000", () => {
  console.log("server started on port 4000");
});
