import React ,{useState}from "react";
import "./Login.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Login() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const showToastMessage = () => {
  //   toast.success("Success !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };

  // const showToastMessageError = () => {
  //   toast.error("Your id or password did not match !", {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputId = sessionStorage.getItem("id");
    const inputPassword = sessionStorage.getItem("password");
    if (inputId === id && inputPassword === password) {

      console.log("id:",inputId);
      navigate("/");
    } 
    setId("");
    setPassword("");
  }
  return (
    <div className="containers">
      <div className="row">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
          <div className="log-ele">
            <MdOutlineEmail className="ic"/>
            <input type="email" placeholder="Email" value={id} onChange={(e)=>setId(e.target.value)}  className="inputs" />
          </div>
          <div className="log-ele">
            <RiLockPasswordLine  className="ic" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="inputs" />
          </div>
          <div className="log-ele">
            <button style={{width:'300px'}} className="siCbutton" type="submit">Submit</button>
          </div>
          <div className="log-ele">
            Not registered? <span className="signup" onClick={()=>navigate("/register")} >Click here</span>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
