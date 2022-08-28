import "./item.css";
function ItemsAlike(props) {
  return (
    <tr className="text-center itemsCenter">
      <td>
        <div className="px-1 row">
          <button type="button" class="btn btn-success mt-1 mb-1">
            Success
          </button>
          <button type="button" class="btn btn-danger">
            Danger
          </button>
        </div>
      </td>
      <td className="pt-4">{props.companyData.SID}</td>
      <td className="pt-4">{props.companyData.LongName}</td>
      <td className="pt-4">{props.companyData.TaxID1}</td>
      <td className="pt-4">{props.companyData.area?.replace(/\s/g, "")}</td>
      <td className="pt-4">{props.companyData.Location}</td>
      <td className="pt-4">{props.companyData.farea?.replace(/\s/g, "")}</td>
      <td className="pt-4">{props.companyData.FLocation}</td>
      <td className="pt-4">{props.companyData.Activity_code}</td>
      <td className="pt-4">{props.companyData.Activity_name}</td>
      <td className="pt-4">{props.companyData.LegalFormID}</td>
      <td className="pt-4">{props.companyData.Phone}</td>
      <td className="pt-4">{props.companyData.HeadFname}</td>
      <td className="pt-4">{props.companyData.HeadLname}</td>
      <td className="pt-4">{props.companyData.Email}</td>
      <td className="pt-4">{props.companyData.Web}</td>
      <td className="pt-4">{props.companyData.sms}</td>
      <td className="pt-4">{props.companyData.TaxEmail}</td>
      <td className="pt-4">{props.companyData.TaxPhone}</td>
      <td className="pt-4">{props.companyData.user_id}</td>
      <td className="pt-4">{props.companyData.Strata1}</td>
      <td className="pt-4">{props.companyData.Strata2}</td>
      <td className="pt-4">{props.companyData.Strata3}</td>
      <td className="pt-4">{props.companyData.Strata}</td>
    </tr>
  );
}
export default ItemsAlike;
