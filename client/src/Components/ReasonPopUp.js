import { useState } from "react";
import "./item.css";
import axios from "axios";
function ReasonPopUp(props) {
  const [reason, setReason] = useState("");

  function SendRejectReason(event) {
    event.preventDefault();
    let SID = props.companyData.SID;
    let Status_Sampling = 4;
    let Reject_Reason = reason;
    axios
      .post("http://localhost:4000/clickedItemUpdate", {
        SID: SID,
        Status_Sampling: Status_Sampling,
        Reject_Reason: Reject_Reason,
      })
      .then(() => {
        alert("სტატუსი განახლებულია (სტატუსი 4)");
      });
    props.SetrejectPopUpRender(false);
  }
  return (
    <div>
      {props.rejectPopUpRender && (
        <div className="iconVideo">
          <div className="VideoBox">
            <div className="d-flex justify-content-between p-3 pb-0">
              <p>მონიშნეთ მიზეზი</p>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.SetrejectPopUpRender(false)}
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
            <div>
              <div className="form-floating">
                <div
                  onChange={(e) => setReason(e.target.value)}
                  className="m-4"
                >
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio0"
                      value="0"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio0">
                      0
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      1
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      2
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="3"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio3">
                      3{" "}
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success mb-5 mt-4 mx-4 float-end"
                onClick={SendRejectReason}
              >
                შენახვა
              </button>
            </div>

            <hr
              style={{
                width: "93%",
                height: "2px",
                margin: "auto",
                color: "#2558FF",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default ReasonPopUp;
