import {useState} from "react";
import "./signIn.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function SignIn(props) {
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  let navigate = useNavigate();
  const [errorText, SetErrorText] = useState('')
  function SubmitSignIn(event) {
    event.preventDefault();
    let baseURL = `http://localhost:4000/user/${userName}/${password}`;
    axios.get(baseURL).then((response) => {
      if (response.data) {
        props.SetUserData(response.data);
        if(response.data.length){
          navigate('/Chanacvleba', { replace: true })
          SetErrorText("")
        }
      } if(response.data.length === 0) {
        SetErrorText("გთხოვთ შეიყვანოთ სწორი მონაცემები")
      }
    });
  }


  return (
    <div className="main_container">
      <div className="container">
        <h1 className="h1_text">ავტორიზაცია</h1>
        <div className="sign_in_container">
          <input
            className="input"
            type="text"
            placeholder="სახელი"
            name="uname"
            required
            value={userName}
            onChange={(e) => SetUserName(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="პაროლი"
            name="psw"
            required
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <p style={{ color: "red" }}>{errorText}</p>
          <button className="sign_in_btn" type="submit" onClick={SubmitSignIn}>
            შესვლა
          </button>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
