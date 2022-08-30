import axios from "axios";
function SuccessItems(props) {
  function Minicheba(e){
    if(e.target.id){
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
  return (
    <tr className="text-center" style={{background:'#E8E9EB'}}>
      <td>
        <div className="px-1 row">
          <button type="button" onClick={(e)=>Minicheba(e)} className="btn btn-outline-success mt-3" id={props.companyData?.SID}>
            მინიჭება
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
export default SuccessItems;
