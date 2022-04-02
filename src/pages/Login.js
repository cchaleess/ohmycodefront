import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import {users} from "../utils/Users";

const Login = ({setIsLogged}) => {

  const navigate = useNavigate();

  const [user, setUser] = useState({    
    userName: "",
    password: "",
  });

  const handleChange = async (e) => {
    await setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const iniciarSesion = (e) => {
    e.preventDefault();
    console.log(user);
     const userName = user.userName;
    const password = user.password;
    const userLogin = users.find((user) => user.userName === userName && user.password === password);
   
    
    if (userLogin !== undefined) {       
        localStorage.setItem("user", JSON.stringify(userLogin));
        setIsLogged(true);
        navigate("/table");
    } else {
        alert("Usuario o contraseña incorrectos");
        }
    }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Login</h3>
          <form onSubmit={iniciarSesion}>
            <div className="form-group p-4">
              <label htmlFor="userName">User</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="User"
                onChange={handleChange}
                name="userName"             
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
