import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Formulario = ({ task, handleChange }) => {
  const navigate = useNavigate();

  const [error, setError] = useState({});

  const validate = () => {
    let error = {};
    if (task.userId <= 0) {
      error.userId = "El Id debe ser mayor a 0";
    }
    if (task.title.length === 0 || task.title.length > 200) {
      error.title = "Debe ingresar un título y que sea menor a 200 caracteres";
    }
    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Actualizar con bearer token
    if (validate()) {
      const updateTodo = axios.put(
        "http://localhost:4000/api/todos/" + task._id,
        {
          userId: task.userId,
          id: task.id,
          title: task.title,
          completed: task.completed,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      updateTodo
        .then((res) => {
          if (res.status === 200) {
            alert("Updated successfully");
            //Redireccionar a la tabla
            navigate("/table");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Task Form</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group p-4">
              <label htmlFor="userId">User id</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                placeholder="Id de usuario"
                onChange={handleChange}
                value={task._id}
                name="userId"
                disabled
              />
              {error.userId && <p className="text-danger">{error.userId}</p>}
            </div>

            <div className="form-group p-4">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Título"
                onChange={handleChange}
                value={task.title}
                name="title"
              />
              {error.title && <p className="text-danger">{error.title}</p>}
            </div>

            <div className="form-group p-4">
              <label htmlFor="completed">Completed</label>
              <select
                className="form-control"
                id="completed"
                onChange={handleChange}
                name="completed"
                value={task.completed}
              >
                <option value={true}>Completed</option>
                <option value={false}>Not Completed</option>
              </select>
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

export default Formulario;
