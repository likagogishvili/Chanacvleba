var data = require("./excelData.js").companyData;
var users = require("./excelData.js").users;
let CryptoJS = require("crypto-js");

const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Create connection
const db = mysql.createConnection({
  host: "",
  user: "root",
  password: "Likagogishvili1@",
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
  });
});

// Create Table
app.get("/companies", (req, res) => {
  let sql =
    "CREATE TABLE companies (id int NOT NULL AUTO_INCREMENT, SID int, LongName varchar(255), TaxID1 int, area varchar(255), Location varchar(255), farea varchar(255), FLocation varchar(255), Activity_code varchar(255), Activity_name varchar(255), LegalFormID int, Phone int, HeadFname varchar(255), HeadLname varchar(255), Email varchar(255), Web varchar(255), sms varchar(255), TaxEmail varchar(255), TaxPhone int, user_id int, Strata1 int,Strata2 int, Strata3 varchar(255), Strata varchar(255), Status_Sampling varchar(255), Status_Result varchar(255), Reject_Reason varchar(255), PRIMARY KEY (id));";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Table created");
  });
});

//Insert into Table
app.get("/addCompany", (req, res) => {
  let sql = "INSERT INTO companies SET ?";
  let query = db.query(
    "INSERT INTO companies (id, SID, LongName, TaxID1, area, Location, farea, FLocation, Activity_code, Activity_name, LegalFormID, Phone, HeadFname,HeadLname, Email, Web, sms, TaxEmail, TaxPhone, user_id, Strata1,Strata2, Strata3, Strata, Status_Sampling, Status_Result, Reject_Reason) VALUES ?",
    [
      data.map((item) => [
        item.id,
        item.SID,
        item.LongName,
        item.TaxID1,
        item.area,
        item.Location,
        item.farea,
        item.FLocation,
        item.Activity_code,
        item.Activity_name,
        item.LegalFormID,
        item.Phone,
        item.HeadFname,
        item.HeadLname,
        item.Email,
        item.Web,
        item.sms,
        item.TaxEmail,
        item.TaxPhone,
        item.user_id,
        item.Strata1,
        item.Strata2,
        item.Strata3,
        item.Strata,
        item.Status_Sampling,
        item.Status_Result,
        item.Reject_Reason,
      ]),
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Table created");
      }
    }
  );
});

// select all comapanies
app.get("/companiesSelect", (req, res) => {
  let sql = "Select * from companies";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//get inputed item
app.get("/itemSelect/:id?", (req, res) => {
  const { id } = req.params;
  if (id) {
    let sql = `Select * from companies Where (SID like '${id}' OR TaxID1 like '${id}') AND Status_Sampling=1`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send(`missing parametres`);
  }
});

//get similar companies with same strata
app.post("/strataSelect", (req, res) => {
  const Strata = req.body.Strata;
  const sid = req.body.sid;
  const lId = req.body.lId;

  if (Strata && sid && lId) {
    let sql = `Select * from companies Where Status_Sampling = 0 && area like '${lId}%' && Strata = '${Strata}' && SID != ${sid} && TaxID1 != ${sid} Limit 1`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      if (!result.length) {
        let sqlAlter = `Select * from companies Where Status_Sampling = 0 && Strata = '${Strata}' && SID != ${sid} && TaxID1 != ${sid} Limit 1`;
        db.query(sqlAlter, (errAlter, resultAlter) => {
          if (errAlter) throw errAlter;
          res.send(resultAlter);
        });
      } else {
        res.send(result);
      }
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
  const sqlUpdate = `UPDATE companies SET Status_Result = '${Status_Result}' WHERE SID like '${SID}' OR TaxID1 like '${SID}' `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//update status Of other company
app.post("/updateOtherCompanyStatus", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;

  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}' WHERE SID like ${SID} OR TaxID1 like '${SID}'`;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//acceptStatusStrata
app.post("/acceptStatusStrata", (req, res) => {
  const SID = req.body.SID;
  const sqlUpdate = `UPDATE companies SET Status_Sampling = '3' WHERE SID like '${SID}' OR TaxID1 like '${SID}' `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//select all stratas with status 2
app.get("/newStratas", (req, res) => {
  let sql = `Select * from companies Where Status_Sampling=2`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//status rejected
app.post("/rejected", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;
  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}' WHERE SID like ${SID} OR TaxID1 like ${SID} `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//update clicked item to 3
app.post("/clickedItemUpdate", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;
  const Reject_Reason = req.body.Reject_Reason;
  const sqlUpdate = `UPDATE companies SET Status_Sampling ='${Status_Sampling}', Status_Result='${Reject_Reason}' WHERE SID like ${SID} OR TaxID1 like ${SID}`;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//select all rejected items
app.get("/allRejectedItems", (req, res) => {
  let sql = "Select * from companies where Status_Sampling=4";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

///////////////////////////////////////////////////////////signIn////////////////////////////////
app.get("/signInTable", (req, res) => {
  let sql =
    "CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, name varchar(255), lname varchar(255), userName varchar(255), password varchar(255),locationId varchar(255), PRIMARY KEY (id));";

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Table created");
  });
});

app.get("/addUsers", (req, res) => {
  let sql = "INSERT INTO users SET ?";
  let query = db.query(
    "INSERT INTO users (name,lname,userName,password,locationId) VALUES ?",
    [
      users.map((item) => [
        item.name,
        item.lname,
        item.userName,
        item.password,
        item.locationId,
      ]),
    ],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values added");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  let r = { success: false, response: { data: [] }, error: "" };

  if (userName && password) {
    let sql = `Select * from users Where userName = '${userName}' AND password = '${password}' limit 1`;

    db.query(sql, (err, result) => {
      if (err) throw err;

      if (result[0]) {
        let user = result[0];

        user.password = CryptoJS.AES.encrypt(
          JSON.stringify(req.body.password),
          "lika_LIKA"
        ).toString();

        r.response.data = user;
        r.success = true;

        res.send(r);
      } else {
        r.error = `User Not Found`;
        res.send(r);
      }
    });
  } else {
    r.error = `missing parametres`;
    res.send(r);
  }
});

app.listen("4000", () => {
  console.log("server started on port 4000");
});
