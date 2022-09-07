import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Components/Item";
import ItemsAlike from "./Components/ItemsAlike";
import SuccessItems from "./Accepted/SuccessItems";
import ReasonPopUp from "./Components/ReasonPopUp";
import RejectedItems from "./Rejected/RejectedItems";
import { useNavigate } from "react-router-dom";
import TableHeaders from "./Components/TableHeaders";

function MainPage(props) {
  const [companyCode, setCompanyCode] = useState("");
  const [companyData, setCompanyData] = useState();
  const [otherCompany, setOtherCompany] = useState();
  const [companiesSuccsess, SetcompaniesSuccsess] = useState();
  const [rejectPopUpRender, SetrejectPopUpRender] = useState(false);
  const [rejectedRender, SetRejectedRender] = useState(false);
  const [successRender, SetSuccessRender] = useState(false);
  const [notFound, SetNotFound] = useState("");
  const [otherCompanyNotFound, setOtherCompanyNotFound] = useState();

  // const [statusSampling, setStatusSampling] = useState();
  const [statusResult, setstatusResult] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(window.sessionStorage.getItem("user"))) {
      navigate("/");
    }
    // eslint-disable-next-line
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
      if (companyData[0]) {
        setstatusResult(companyData[0]?.Status_Result);
      } else {
        SetNotFound("ვერ მოიძებნა");
      }
    }
  }, [companyData]);

  //pirveli, kodit status cvlileba
  function ChangeValues() {
    if (companyData) {
      if (companyData[0].Status_Result !== statusResult) {
        let Status_Result = statusResult;
        let SID = companyData[0].SID;
        axios
          .post("http://localhost:4000/updateDB", {
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

  //pirveli, kodit status cvlileba
  // function ChangeValues() {
  //   if (companyData) {
  //     if (
  //       companyData[0].Status_Sampling !== statusSampling ||
  //       companyData[0].Status_Result !== statusResult
  //     ) {
  //       let Status_Sampling = statusSampling;
  //       let Status_Result = statusResult;
  //       let SID = companyData[0].SID;
  //       axios
  //         .post("http://localhost:4000/updateDB", {
  //           Status_Sampling: Status_Sampling,
  //           Status_Result: Status_Result,
  //           SID: SID,
  //         })
  //         .then(() => {
  //           alert("განახლებულია");
  //           GetValue();
  //         });
  //     }
  //   }
  // }

  //next Value
  //getNextValue

  function GetNextValue(event) {
    event.preventDefault();

    let baseURL = `http://localhost:4000/strataSelect`;
    axios
      .post(baseURL, {
        Strata: companyData[0].Strata,
        sid: companyData[0].SID,
        lId: companyData[0].area,
      })
      .then((response) => {
        setOtherCompany(response.data);
      });
  }

  //update next value
  function UpdateNextValueStatus() {
    if (otherCompany[0]) {
      if (parseInt(otherCompany[0].Status_Sampling) === 0) {
        let SID = otherCompany[0].SID;
        let Status_Sampling = 2;
        let parentId = companyData[0].SID;

        axios
          .post("http://localhost:4000/updateOtherCompanyStatus", {
            SID: SID,
            Status_Sampling: Status_Sampling,
            parentId: parentId,
          })
          .then(() => {
            alert("სტატუსი განახლებულია (სტატუსი 2)");
          });
      }
    } else {
      setOtherCompanyNotFound("ვერ მოიძებნა");
    }
  }
  useEffect(() => {
    if (otherCompany) {
      UpdateNextValueStatus();
    }
    // eslint-disable-next-line
  }, [otherCompany]);

  //sign out
  function SignOut() {
    window.sessionStorage.removeItem("user");
    props.SetisUserLoggedIn(false);
    navigate("/", { replace: true });
  }

  //სტატუსის ცვლილება

  function ChangeStatus() {
    let baseURL = `http://localhost:4000/newStratas`;
    axios.get(baseURL).then((response) => {
      SetcompaniesSuccsess(response.data);
    });
    SetSuccessRender(true);
  }

  return (
    <div className="container-fluid">
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
          style={{ width: "100%" }}
        >
          <input
            className="form-control mr-sm-2 mx-2"
            style={{ width: "20%" }}
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

          <div className="input-group mx-4" style={{ width: "60%" }}>
            <div className="input-group-prepend">
              <label
                className="input-group-text mx-2"
                style={{ border: "none", backgroundColor: "white" }}
                htmlFor="inputGroupSelect01"
              >
                მონიშნეთ შესაბამისი სტატუსი
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

            <button
              type="button"
              className="btn btn-secondary mx-2"
              onClick={ChangeValues}
              style={{ borderRadius: "10px" }}
            >
              მინიჭება
            </button>
          </div>
        </form>
        <form
          className="form-inline d-flex flex-row m-4"
          style={{ width: "60%" }}
        >
          {/* <div className="input-group" style={{ width: "25%" }}>
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
          </div> */}

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

          <button
            type="button"
            className="btn btn-primary mx-2"
            onClick={(e) => ChangeStatus(true)}
          >
            სტატუსის ცვლილება
          </button>
        </form>
      </nav>
      {companyData && (
        <div className="table-responsive">
          <table className="table mx-1">
            <tbody>
              {companyData.length ? <TableHeaders /> : ""}

              {companyData.length ? (
                <Item companyData={companyData[0]} />
              ) : (
                <tr className="mx-2 mt-4">
                  <td>{notFound}</td>
                </tr>
              )}

              {companyData && otherCompany && otherCompany.length ? (
                <ItemsAlike
                  companyData={otherCompany[0]}
                  oldCompanyData={companyData[0]}
                  SetcompaniesSuccsess={SetcompaniesSuccsess}
                  SetrejectPopUpRender={SetrejectPopUpRender}
                />
              ) : (
                <tr className="mt-4 mx-2">
                  <td>{otherCompanyNotFound}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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

      <SuccessItems
        SetSuccessRender={SetSuccessRender}
        successRender={successRender}
        companiesSuccsess={companiesSuccsess}
      />
    </div>
  );
}
export default MainPage;
