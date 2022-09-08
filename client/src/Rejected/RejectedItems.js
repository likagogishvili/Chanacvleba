import axios from "axios";
import { useState, useEffect } from "react";
import "./rejectedItems.css";
import Ritem from "./Ritem";
function RejectedItems(props) {
  const [rejectedItems, SetRejectedItems] = useState();

  useEffect(() => {
    let baseURL = `http://localhost:4000/allRejectedItems`;
    axios.get(baseURL).then((response) => {
      SetRejectedItems(response.data);
    });
  }, []);

  if (rejectedItems) {
    var rejectedItem = rejectedItems.map((item) => (
      <Ritem key={item.id} companyData={item} />
    ));
  }

  return (
    <div>
      {props.rejectedRender && (
        <div className="iconVideo">
          <div className="VideoBoxreject">
            <div className="d-flex justify-content-between p-5 pb-0">
              <p>უარი საწარმოებისგან</p>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.SetRejectedRender(false)}
              ></button>
            </div>
            <hr
              style={{
                width: "93%",
                height: "2px",
                margin: "auto",
                color: "#2558FF",
              }}
            />
            <div className="form-floating mb-4 scrollTable mt-3">
              <table className="table mx-1">
                <tbody>
                  <tr className="table-dark text-center">
                    <td>SID</td>
                    <td>ParentId</td>
                    <td>LongName</td>
                    <td>TaxID1</td>
                    <td>area</td>
                    <td>Location</td>
                    <td>farea</td>
                    <td>FLocation</td>
                    <td>Activity_code</td>
                    <td>Activity_name</td>
                    <td>LegalFormID</td>
                    <td>Phone</td>
                    <td>HeadFname</td>
                    <td>HeadLname</td>
                    <td>Email</td>
                    <td>Web</td>
                    <td>sms</td>
                    <td>TaxEmail</td>
                    <td>TaxPhone</td>
                    <td>user_id</td>
                    <td>Strata1</td>
                    <td>Strata2</td>
                    <td>Strata3</td>
                    <td>Strata</td>
                    <td>Status_Sampling</td>
                    <td>Status_Result</td>
                  </tr>
                  {rejectedItems && rejectedItem}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default RejectedItems;
