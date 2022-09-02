const XLSX = require("xlsx");
var workbook = XLSX.readFile("data/mainData.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let companyData = [];
let users = [
  {
    id: 1,
    name: "lika",
    lname: "gogishvili",
    userName: "lg",
    password: "lika2001",
  },
];

let k = 0;
for (let i = 2; i < 8; i++) {
  k++;
  const SID = worksheet[`A${i}`].v;
  const LongName = worksheet[`B${i}`].v;
  const TaxID1 = worksheet[`C${i}`].v;
  const area = worksheet[`D${i}`].v;
  const Location = worksheet[`E${i}`].v;
  const farea = worksheet[`F${i}`].v;
  const FLocation = worksheet[`G${i}`].v;
  const Activity_code = worksheet[`H${i}`].v;
  const Activity_name = worksheet[`I${i}`].v;
  const LegalFormID = worksheet[`J${i}`].v;
  const Phone = worksheet[`K${i}`].v;
  const HeadFname = worksheet[`L${i}`].v;
  const HeadLname = worksheet[`M${i}`].v;
  const Email = worksheet[`N${i}`].v;
  const Web = worksheet[`O${i}`].v;
  const sms = worksheet[`P${i}`].v;
  const TaxEmail = worksheet[`Q${i}`].v;
  const TaxPhone = worksheet[`R${i}`].v;
  const user_id = worksheet[`S${i}`].v;
  const Strata1 = worksheet[`T${i}`].v;
  const Strata2 = worksheet[`U${i}`].v;
  const Strata3 = worksheet[`V${i}`].v;
  const Strata = worksheet[`W${i}`].v;
  const Status_Sampling = worksheet[`X${i}`].v;
  const Status_Result = worksheet[`Y${i}`].v;
  const Reject_Reason = worksheet[`Z${i}`].v;

  companyData.push({
    id: k,
    SID: SID,
    LongName: LongName,
    TaxID1: TaxID1,
    area: area,
    Location: Location,
    farea: farea,
    FLocation: FLocation,
    Activity_code: Activity_code,
    Activity_name: Activity_name,
    LegalFormID: LegalFormID,
    Phone: Phone,
    HeadFname: HeadFname,
    HeadLname: HeadLname,
    Email: Email,
    Web: Web,
    sms: sms,
    TaxEmail: TaxEmail,
    TaxPhone: TaxPhone,
    user_id: user_id,
    Strata1: Strata1,
    Strata2: Strata2,
    Strata3: Strata3,
    Strata: Strata,
    Status_Sampling: Status_Sampling,
    Status_Result: Status_Result,
    Reject_Reason: Reject_Reason,
  });
}

exports.companyData = companyData;
exports.users = users;
