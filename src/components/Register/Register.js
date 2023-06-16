import React, { useState } from "react";
import "./Register.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: add logic to submit the form
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("name", name);
    console.log("account created successfully");
    setId("");
    setPassword("");
    navigate("/login");
  };

  return (
    <div className="containers">
      <div className="row">
        <div className="login">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
          <div className="log-elem">
              <MdOutlineEmail className="ics" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inputsv"
              />
            </div>
            <div className="log-elem">
              <MdOutlineEmail className="ics" />
              <input
                type="email"
                placeholder="Email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="inputsv"
              />
            </div>
            <div className="log-elem">
              <RiLockPasswordLine className="ics" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputsv"
              />
            </div>
            <div className="log-elem">
              <button
                style={{ width: "300px" }}
                className="siCbuttons"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
