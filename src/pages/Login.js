import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginService from "../services/LoginService";

const Login = ({ setIsLogged }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = async (e) => {
    await setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    new LoginService().login(user).then((respuesta) => {
      if (respuesta.error) {
        alert(respuesta.error); //respuesta del servidor
      } else {
        localStorage.setItem("token", respuesta.token);
        localStorage.setItem("user", respuesta.username);
        localStorage.setItem("id", respuesta._id);
        setIsLogged(true);
        navigate("/table");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group p-4">
              <label htmlFor="userName">User</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="User"
                onChange={handleChange}
                name="username"
              />
            </div>
            <div className="form-group p-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div
            className="form-group p-4 justify-content-between"
            >
              <button type="submit" 
              className="btn btn-primary btn-block col-sm-6 m-2">
                Login
              </button>
              <a href="/register" 
              className="link-dark col-sm-6 m-2">
                Click here to register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
