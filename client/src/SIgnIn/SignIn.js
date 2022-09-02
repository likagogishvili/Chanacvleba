import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errorText, SetErrorText] = useState("");

  let navigate = useNavigate();

  function SubmitSignIn(event) {
    event.preventDefault();
    let baseURL = `http://localhost:4000/login`;
    axios
      .post(baseURL, { userName: userName, password: password })
      .then((response) => {
        if (response.data.success) {
          props.SetisUserLoggedIn(true);
          window.sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.response.data)
          );
          SetErrorText("");
        } else {
          SetErrorText("გთხოვთ შეიყვანოთ სწორი მონაცემები");
        }
      });
  }

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem("user"))) {
      props.SetisUserLoggedIn(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      props.isUserLoggedIn === true &&
      JSON.parse(window.sessionStorage.getItem("user"))
    ) {
      navigate("/Chanacvleba");
    }
    // eslint-disable-next-line
  }, [props.isUserLoggedIn]);

  return (
    <section className="vh-100" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container py-5 h-100">
        <form
          onSubmit={SubmitSignIn}
          className="row d-flex justify-content-center align-items-center h-100"
        >
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
                >
                  შესვლა
                </button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
export default SignIn;
