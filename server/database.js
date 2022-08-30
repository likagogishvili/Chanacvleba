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
  });
});
// Create Table
app.get("/companies", (req, res) => {
  let sql =
    "CREATE TABLE companies (id int NOT NULL AUTO_INCREMENT, SID int, LongName varchar(255), TaxID1 int, area varchar(255), Location varchar(255), farea varchar(255), FLocation varchar(255), Activity_code varchar(255), Activity_name varchar(255), LegalFormID int, Phone int, HeadFname varchar(255), HeadLname varchar(255), Email varchar(255), Web varchar(255), sms varchar(255), TaxEmail varchar(255), TaxPhone int, user_id int, Strata1 int,Strata2 int, Strata3 varchar(255), Strata varchar(255), Status_Sampling varchar(255), Status_Result varchar(255), PRIMARY KEY (id));";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Table created");
  });
});

//Insert into Table
app.get("/addCompany", (req, res) => {
  let sql = "INSERT INTO companies SET ?";
  let query = db.query(
    "INSERT INTO companies (id, SID, LongName, TaxID1, area, Location, farea, FLocation, Activity_code, Activity_name, LegalFormID, Phone, HeadFname,HeadLname, Email, Web, sms, TaxEmail, TaxPhone, user_id, Strata1,Strata2, Strata3, Strata, Status_Sampling, Status_Result) VALUES ?",
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
      ]),
    ],
    (err, results) => {
      if(error){
        console.log(error);
      }else{
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
    let sql = `Select * from companies Where SID like '${id}' || TaxID1 like '${id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send(`missing parametres`);
  }
});

//get similar companies with same strata
app.get("/strataSelect/:Strata?/:sid?", (req, res) => {
  const Strata = req.params["Strata"];
  const sid = req.params["sid"];
  if (Strata && sid) {
    let sql = `Select * from companies Where Status_Sampling like 0 && Strata like '${Strata}' && SID not like ${sid} && TaxID1 not like ${sid} Limit 1`;
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
  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}', Status_Result = '${Status_Result}' WHERE SID like '${SID}' || TaxID1 like '${SID}' `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//update status Of other company
app.post("/updateOtherCompanyStatus", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;

  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}' WHERE SID like ${SID} || TaxID1 like '${SID}'`;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//select all stratas with status 2
app.get("/newStratas/:Strata?/:sid1?/:sid2?", (req, res) => {
  const Strata = req.params["Strata"];
  const sid1 = req.params["sid1"];
  const sid2 = req.params["sid2"];
  if (Strata && sid1 && sid2) {
    let sql = `Select * from companies Where Status_Sampling like 2 && Strata like '${Strata}' && SID not in (${sid1}, ${sid2}) && TaxID1 not in (${sid1}, ${sid2})`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send(`missing parametres`);
  }
});

//status rejected
app.post("/rejected", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;
  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}' WHERE SID like ${SID} || TaxID1 like ${SID} `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//update clicked item to 3
app.post("/clickedItemUpdate", (req, res) => {
  const SID = req.body.SID;
  const Status_Sampling = req.body.Status_Sampling;
  const sqlUpdate = `UPDATE companies SET Status_Sampling = '${Status_Sampling}' WHERE SID like ${SID} || TaxID1 like ${SID} `;
  db.query(sqlUpdate, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});




app.listen("4000", () => {
  console.log("server started on port 4000");
});
