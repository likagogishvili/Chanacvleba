import { useState } from "react";
import "../Rejected/rejectedItems.css";
import Sitem from "./Sitem";

function SuccessItemsPopUp(props) {
  const [text, setText] = useState("");
  let area = JSON.parse(window.sessionStorage.getItem("user")).area;

  const renderItem = props.companiesSuccsess?.filter((data) => {
    if (text === "") {
      return data;
    }
    if (data.SID.toString().includes(text.toString())) {
      return data;
    }
    return 0;
  });
  const filtered = renderItem?.filter((item) => {
    // eslint-disable-next-line
    return item.area == area;
  });
  if (props.companiesSuccsess) {
    var sucessItems = filtered?.map((item) => (
      <Sitem key={item.id} companyData={item} />
    ));
  }

  return (
    <div>
      {props.successRender && (
        <div className="iconVideo">
          <div className="VideoBoxreject" style={{ width: "90%", left: "5%" }}>
            <div className="d-flex justify-content-between p-5 pb-0">
              <p>სტატუსის ცვლილება</p>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.SetSuccessRender(false)}
              ></button>
            </div>
            <hr
              style={{
                width: "95%",
                height: "2px",
                margin: "auto",
                color: "#2558FF",
              }}
            />

            <section className="search">
              <form>
                <input
                  type="text"
                  className="form-control mt-4 mx-5"
                  placeholder="შეიყვანეთ კოდი"
                  style={{ width: "25%" }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  autoFocus
                />
              </form>
            </section>

            <div className="form-floating mb-4 scrollTable mt-3">
              <table className="table mx-1">
                <tbody>
                  <tr className="table-dark text-center">
                    <td></td>
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
                  {props.companiesSuccsess && sucessItems}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SuccessItemsPopUp;
