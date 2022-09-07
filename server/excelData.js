const XLSX = require("xlsx");
var workbook = XLSX.readFile("./data/mainData.xlsx");
let worksheet = workbook.Sheets[workbook.SheetNames[0]];
let companyData = [];

let users = [
  {
    name: "lika",
    lname: "gogishvili",
    userName: "lg",
    password: "lika2001",
  },
  {
    name: "John",
    lname: "Doe",
    userName: "jl",
    password: "jl123",
  },
];

let k = 0;
for (let i = 2; i < 8; i++) {
  k++;
  const SID = worksheet[`A${i}`].v;
  const ParentId = worksheet[`B${i}`].v;
  const LongName = worksheet[`C${i}`].v;
  const TaxID1 = worksheet[`D${i}`].v;
  const area = worksheet[`E${i}`].v;
  const Location = worksheet[`F${i}`].v;
  const farea = worksheet[`G${i}`].v;
  const FLocation = worksheet[`H${i}`].v;
  const Activity_code = worksheet[`I${i}`].v;
  const Activity_name = worksheet[`J${i}`].v;
  const LegalFormID = worksheet[`K${i}`].v;
  const Phone = worksheet[`L${i}`].v;
  const HeadFname = worksheet[`M${i}`].v;
  const HeadLname = worksheet[`N${i}`].v;
  const Email = worksheet[`O${i}`].v;
  const Web = worksheet[`P${i}`].v;
  const sms = worksheet[`Q${i}`].v;
  const TaxEmail = worksheet[`R${i}`].v;
  const TaxPhone = worksheet[`S${i}`].v;
  const user_id = worksheet[`T${i}`].v;
  const Strata1 = worksheet[`U${i}`].v;
  const Strata2 = worksheet[`V${i}`].v;
  const Strata3 = worksheet[`W${i}`].v;
  const Strata = worksheet[`X${i}`].v;
  const Status_Sampling = worksheet[`Y${i}`].v;
  const Status_Result = worksheet[`Z${i}`].v;

  companyData.push({
    id: k,
    SID: SID,
    ParentId: ParentId,
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
  });
}

exports.companyData = companyData;
exports.users = users;
