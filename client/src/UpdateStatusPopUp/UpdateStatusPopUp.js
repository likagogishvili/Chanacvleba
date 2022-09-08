import { useState } from "react";
import axios from "axios";
function UpdateStatusPopUp(props) {
  const [statusResult, setstatusResult] = useState();
  const [statusSampling, setstatusSampling] = useState();
  const [company, setCompany] = useState("");

  function Minicheba(event) {
    event.preventDefault();
    let SID = company;
    let Status_Sampling = statusSampling;
    let Status_Result = statusResult;
    axios
      .post("http://localhost:4000/UpdateStatusForSpecificCompany", {
        SID: SID,
        Status_Sampling: Status_Sampling,
        Status_Result: Status_Result,
      })
      .then(() => {
        alert("სტატუსი განახლებულია");
      });
  }

  return (
    <div>
      {props.updateStatusPopUp && (
        <div className="iconVideo">
          <div className="VideoBoxreject" style={{ width: "90%", left: "5%" }}>
            <div className="d-flex justify-content-between p-5 pb-0">
              <p className="mx-3">სტატუსის ცვლილება</p>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={(e) => props.SetUpdateStatusPopUp(false)}
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
            <div
              className="form-floating mb-4 mt-3"
              style={{ minHeight: "150px" }}
            >
              <form
                className="form-inline d-flex flex-row mx-5 mt-5"
                style={{ width: "100%" }}
              >
                <input
                  className="form-control mr-sm-2 mx-2"
                  style={{ width: "20%" }}
                  type="number"
                  placeholder="შეიყვანეთ საწარმოს კოდი"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                />

                <div className="input-group mx-4" style={{ width: "60%" }}>
                  <div className="input-group-prepend">
                    <label
                      className="input-group-text mx-2"
                      style={{ border: "none", backgroundColor: "white" }}
                      htmlFor="inputGroupSelect01"
                    >
                      Status-Result-ის შეცვლა
                    </label>
                  </div>

                  <select
                    className="custom-select"
                    id="status_res"
                    defaultValue={"DEFAULT"}
                    value={statusResult}
                    onChange={(e) => {
                      setstatusResult(e.target.value);
                    }}
                  >
                    <option value="DEFAULT" disabled></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>

                  <div className="input-group-prepend mx-4">
                    <label
                      className="input-group-text mx-2"
                      style={{ border: "none", backgroundColor: "white" }}
                      htmlFor="inputGroupSelect01"
                    >
                      Status_Sampling-ის შეცვლა
                    </label>
                  </div>

                  <select
                    className="custom-select"
                    id="status_res"
                    defaultValue={"DEFAULT"}
                    value={statusSampling}
                    onChange={(e) => {
                      setstatusSampling(e.target.value);
                    }}
                  >
                    <option value="DEFAULT" disabled></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>

                  <button
                    type="button"
                    className="btn btn-secondary mx-5"
                    onClick={Minicheba}
                    style={{ borderRadius: "10px" }}
                  >
                    მინიჭება
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateStatusPopUp;
