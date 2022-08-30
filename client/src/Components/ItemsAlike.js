import "./item.css";
import axios from "axios";
function ItemsAlike(props) {
  function Accept() {
    if (
      props.companyData.Strata &&
      props.oldCompanyData.SID &&
      props.companyData.SID
    ) {
      let baseURL = `http://localhost:4000/newStratas/${props.companyData.Strata}/${props.oldCompanyData.SID}/${props.companyData.SID}`;
      axios.get(baseURL).then((response) => {
        props.SetcompaniesSuccsess(response.data);
      });
    }
  }

  function Reject() {
    if (props.companyData) {
      if (props.companyData[0]) {
        let SID = props.companyData.SID;
        let Status_Sampling = 4;
        axios
          .post("http://localhost:4000/clickedItemUpdate", {
            SID: SID,
            Status_Sampling: Status_Sampling,
          })
          .then(() => {
            alert("სტატუსი განახლებულია (სტატუსი 4)");
          });
      }
    }
    props.SetrejectPopUpRender(true)
  }

  return (
    <tr className="text-center" style={{ background: "#d4d4d4" }}>
      <td>
        <div className="px-1 row">
          <button
            type="button"
            className="btn btn-outline-success mt-1 mb-1"
            onClick={Accept}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={Reject}
          >
            Reject
          </button>
        </div>
      </td>
      <td className="pt-4">{props.companyData?.SID}</td>
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
    </tr>
  );
}
export default ItemsAlike;
