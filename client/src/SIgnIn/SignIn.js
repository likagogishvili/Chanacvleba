import { useState } from "react";
import "./signIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  let navigate = useNavigate();
  const [errorText, SetErrorText] = useState("");
  function SubmitSignIn(event) {
    event.preventDefault();
    let baseURL = `http://localhost:4000/user/${userName}/${password}`;
    axios.get(baseURL).then((response) => {
      if (response.data) {
        props.SetUserData(response.data);
        if (response.data.length) {
          navigate("/Chanacvleba", { replace: true });
          SetErrorText("");
        }
      }
      if (response.data.length === 0) {
        SetErrorText("გთხოვთ შეიყვანოთ სწორი მონაცემები");
      }
    });
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">ავტორიზაცია</h3>

                <div className="form-outline mb-4">
                  <input
                    type="name"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    value={userName}
                    onChange={(e) => SetUserName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    სახელი
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">
                    პაროლი
                  </label>
                </div>
                <p style={{ color: "red" }}>{errorText}</p>

                <button
                  className="btn btn-success btn-lg btn-block mb-2"
                  type="submit"
                  style={{ width: "100%" }}
                  onClick={SubmitSignIn}
                >
                  შესვლა
                </button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SignIn;
