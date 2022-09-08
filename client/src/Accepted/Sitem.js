import axios from "axios";
import { useState } from "react";
function Sitem(props) {
  const [statusResult, setstatusResult] = useState();
  function Minicheba(e) {
    if (e.target.id) {
      let SID = e.target.id;
      let Status_Sampling = 3;
      axios
        .post("http://localhost:4000/clickedItemUpdate", {
          SID: SID,
          Status_Sampling: Status_Sampling,
        })
        .then(() => {
          alert("სტატუსი განახლებულია (სტატუსი 3)");
        });
    }
  }

  function Reject(e) {
    e.preventDefault();
    console.log(statusResult);
    console.log(e.target.id);
    let SID = e.target.id;
    let Status_Sampling = 4;
    let Reject_Reason = statusResult;
    axios
      .post("http://localhost:4000/clickedItemUpdate", {
        SID: SID,
        Status_Sampling: Status_Sampling,
        Reject_Reason: Reject_Reason,
      })
      .then(() => {
        alert("სტატუსი განახლებულია (სტატუსი 4)");
      });
  }

  return (
    <tr className="text-center" style={{ background: "#E8E9EB" }}>
      <td>
        <div className="px-1 row">
          <button
            type="button"
            className="btn btn-outline-success mt-1 mb-1"
            onClick={Minicheba}
            id={props.companyData?.SID}
          >
            Accept
          </button>

          <select
            className="custom-select my-1"
            id="status_res"
            defaultValue={"DEFAULT"}
            value={statusResult}
            onChange={(e) => {
              setstatusResult(e.target.value);
            }}
          >
            <option
              value="DEFAULT"
              disabled
              style={{ fontSize: "3px" }}
            ></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={Reject}
            id={props.companyData?.SID}
          >
            Reject
          </button>
        </div>
      </td>
      <td className="pt-4">{props.companyData?.SID}</td>
      <td className="pt-4">{props.companyData?.ParentId}</td>
      <td className="pt-4">{props.companyData?.LongName}</td>
      <td className="pt-4">{props.companyData?.TaxID1}</td>
      <td className="pt-4">{props.companyData?.area?.replace(/\s/g, "")}</td>
      <td className="pt-4">{props.companyData?.Location}</td>
      <td className="pt-4">{props.companyData?.farea?.replace(/\s/g, "")}</td>
      <td className="pt-4">{props.companyData?.FLocation}</td>
      <td className="pt-4">{props.companyData?.Activity_code}</td>
      <td className="pt-4">{props.companyData?.Activity_name}</td>
      <td className="pt-4">{props.companyData?.LegalFormID}</td>
      <td className="pt-4">{props.companyData?.Phone}</td>
      <td className="pt-4">{props.companyData?.HeadFname}</td>
      <td className="pt-4">{props.companyData?.HeadLname}</td>
      <td className="pt-4">{props.companyData?.Email}</td>
      <td className="pt-4">{props.companyData?.Web}</td>
      <td className="pt-4">{props.companyData?.sms}</td>
      <td className="pt-4">{props.companyData?.TaxEmail}</td>
      <td className="pt-4">{props.companyData?.TaxPhone}</td>
      <td className="pt-4">{props.companyData?.user_id}</td>
      <td className="pt-4">{props.companyData?.Strata1}</td>
      <td className="pt-4">{props.companyData?.Strata2}</td>
      <td className="pt-4">{props.companyData?.Strata3}</td>
      <td className="pt-4">{props.companyData?.Strata}</td>
      <td className="pt-4">{props.companyData?.Status_Sampling}</td>
      <td className="pt-4">{props.companyData?.Status_Result}</td>
    </tr>
  );
}
export default Sitem;
