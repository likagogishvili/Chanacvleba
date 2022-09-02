import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Components/Item";
import ItemsAlike from "./Components/ItemsAlike";
import SuccessItems from "./Components/SuccessItems";
import ReasonPopUp from "./Components/ReasonPopUp";
import RejectedItems from "./Rejected/RejectedItems";
import { useNavigate } from "react-router-dom";

function MainPage(props) {
  const [companyCode, setCompanyCode] = useState("");
  const [companyData, setCompanyData] = useState();
  const [otherCompany, setOtherCompany] = useState();
  const [companiesSuccsess, SetcompaniesSuccsess] = useState();
  const [rejectPopUpRender, SetrejectPopUpRender] = useState(false);
  const [rejectedRender, SetRejectedRender] = useState(false);

  let navigate = useNavigate();

  const [statusSampling, setStatusSampling] = useState();
  const [statusResult, setstatusResult] = useState();

  useEffect(() => {
    if (!JSON.parse(window.sessionStorage.getItem("user"))) {
      navigate("/");
    }
  }, []);

  //   17063451
  function GetValue(event) {
    if (event) {
      event.preventDefault();
    }
    let baseURL = `http://localhost:4000/itemSelect/${companyCode}`;
    axios.get(baseURL).then((response) => {
      setCompanyData(response.data);
    });
  }

  useEffect(() => {
    if (companyData) {
      setStatusSampling(companyData[0].Status_Sampling);
      setstatusResult(companyData[0].Status_Result);
    }
  }, [companyData]);

  //pirveli, kodit status cvlileba
  function ChangeValues() {
    if (companyData) {
      if (
        companyData[0].Status_Sampling !== statusSampling ||
        companyData[0].Status_Result !== statusResult
      ) {
        let Status_Sampling = statusSampling;
        let Status_Result = statusResult;
        let SID = companyData[0].SID;
        axios
          .post("http://localhost:4000/updateDB", {
            Status_Sampling: Status_Sampling,
            Status_Result: Status_Result,
            SID: SID,
          })
          .then(() => {
            alert("განახლებულია");
            GetValue();
          });
      }
    }
  }

  //next Value
  //getNextValue
  function GetNextValue(event) {
    event.preventDefault();
    let baseURL = `http://localhost:4000/strataSelect/${companyData[0].Strata}/${companyData[0].SID}`;
    axios.get(baseURL).then((response) => {
      setOtherCompany(response.data);
    });
  }

  //update next value
  function UpdateNextValueStatus() {
    if (otherCompany[0]) {
      if (parseInt(otherCompany[0].Status_Sampling) === 0) {
        let SID = otherCompany[0].SID;
        let Status_Sampling = 2;
        axios
          .post("http://localhost:4000/updateOtherCompanyStatus", {
            SID: SID,
            Status_Sampling: Status_Sampling,
          })
          .then(() => {
            alert("სტატუსი განახლებულია (სტატუსი 2)");
          });
      }
    }
  }
  useEffect(() => {
    if (otherCompany) {
      UpdateNextValueStatus();
    }
    // eslint-disable-next-line
  }, [otherCompany]);

  //succsess items render

  if (companiesSuccsess) {
    var successItems = companiesSuccsess.map((item) => (
      <SuccessItems key={item.id} companyData={item} />
    ));
  }

  //sign out
  function SignOut() {
    window.sessionStorage.removeItem("user");
    props.SetisUserLoggedIn(false);
    navigate("/", { replace: true });
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="h3 m-4">ჩანაცვლების პროცედურა</p>
        <button
          className="btn btn-outline-primary my-2 my-sm-0 mx-5"
          onClick={SignOut}
        >
          გასვლა
        </button>
      </div>
      <nav className="navbar navbar-light bg-light" style={{ width: "100%" }}>
        <form
          className="form-inline d-flex flex-row m-4"
          style={{ width: "60%" }}
        >
          <input
            className="form-control mr-sm-2 mx-2"
            style={{ width: "40%" }}
            type="number"
            placeholder="შეიყვანეთ საწარმოს კოდი"
            onChange={(e) => setCompanyCode(e.target.value)}
            value={companyCode}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={GetValue}
          >
            ძებნა
          </button>
        </form>

        <form
          className="form-inline d-flex flex-row m-4"
          style={{ width: "60%" }}
        >
          <div className="input-group" style={{ width: "25%" }}>
            <div className="input-group-prepend">
              <label
                className="input-group-text mx-2"
                style={{ border: "none", backgroundColor: "white" }}
                htmlFor="inputGroupSelect01"
              >
                Status_Sampling
              </label>
            </div>

            <select
              className="custom-select"
              id="Status_Sampling"
              defaultValue={"DEFAULT"}
              value={statusSampling}
              onChange={(e) => {
                setStatusSampling(e.target.value);
              }}
            >
              <option value="DEFAULT" disabled></option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="input-group" style={{ width: "25%" }}>
            <div className="input-group-prepend">
              <label
                className="input-group-text mx-2"
                style={{ border: "none", backgroundColor: "white" }}
                htmlFor="inputGroupSelect01"
              >
                Status_results
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
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={ChangeValues}
          >
            განახლება
          </button>

          <button
            type="button"
            className="btn btn-success mx-2"
            onClick={GetNextValue}
          >
            შერჩევა
          </button>
          <button
            type="button"
            className="btn btn-dark mx-2"
            onClick={(e) => SetRejectedRender(true)}
          >
            უარი საწარმოსგან
          </button>
        </form>
      </nav>
      {companyData && (
        <table className="table mx-1">
          <tbody>
            <tr className="table-dark text-center">
              <td>Change</td>
              <td>SID</td>
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
            </tr>

            {companyData && <Item companyData={companyData[0]} />}
            {otherCompany && companyData && (
              <ItemsAlike
                companyData={otherCompany[0]}
                oldCompanyData={companyData[0]}
                SetcompaniesSuccsess={SetcompaniesSuccsess}
                SetrejectPopUpRender={SetrejectPopUpRender}
              />
            )}
            {companiesSuccsess && successItems}
          </tbody>
        </table>
      )}
      {otherCompany && (
        <ReasonPopUp
          rejectPopUpRender={rejectPopUpRender}
          SetrejectPopUpRender={SetrejectPopUpRender}
          companyData={otherCompany[0]}
        />
      )}

      <RejectedItems
        SetRejectedRender={SetRejectedRender}
        rejectedRender={rejectedRender}
      />
    </div>
  );
}
export default MainPage;
