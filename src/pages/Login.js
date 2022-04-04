import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../utils/Users";
import axios from "axios";

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

  const obtenerToken = async (e) => {
    e.preventDefault();

    //Comprobar username
    const userExists = users.find(
      (usuario) => user.username === usuario.username
    );

    if (!userExists) {
      alert("El Usuario no existe");
      return;
    }

    const url = "http://localhost:4000/api/users/login";

    const response = await axios.post(url, {
      username: user.username,
      password: user.password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data._id));
    setIsLogged(true);
    navigate("/table");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={obtenerToken}>
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
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
