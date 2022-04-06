import React, { useState } from "react";
import LoginService from "../services/LoginService";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    address: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    new LoginService().createUser(user).then((res) => {
      if (res.status === 200) {
        alert("User created successfully");
        navigate("/login");
      } else {
        alert("User already exists");
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Register User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group p-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-4">
              <label htmlFor="username">Username</label>
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

            <div className="form-group p-4">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                className="form-control"
                id="address.street"
                placeholder="Street"
                name="address.street"
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-4">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                className="form-control"
                id="address.city"
                placeholder="City"
                name="address.city"
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-4">
              <label htmlFor="address.zipcode">Zipcode</label>
              <input
                type="text"
                className="form-control"
                id="address.zipcode"
                placeholder="Zipcode"
                name="address.zip"
                onChange={handleChange}
              />
            </div>
            <div className="form-group p-4">
              <label htmlFor="address.country">Country</label>
              <input
                type="text"
                className="form-control"
                id="address.country"
                placeholder="Country"
                name="address.country"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
