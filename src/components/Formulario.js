import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskService from "../services/TaskService";
import Error from "./Error";

const Formulario = ({ task, handleChange, isLogged }) => {


  const navigate = useNavigate();

  const [error, setError] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
  console.log(task);
    if (task.title.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    if(task.id){
      console.log("Editando");
      new TaskService().updateTask(task).then((res) => {
    
        if (res.status === 200) {

          alert("Tarea actualizada");
          navigate("/table");
        }
      });
    }else{
      console.log("Creando");
      new TaskService().createTask(task).then((res) => {
debugger;
        if (res.status === 200) {
          alert("Tarea creada");
          navigate("/table");
        }
      });
    }
      };



 

  return (
    <div className="container">
      {isLogged ? (
           <div className="row">
        <div className="col-md-6 offset-md-3 p-4">
          <h3 className="text-center">Task Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group p-4">
              <label htmlFor="user">User id</label>
              <input
                type="text"
                className="form-control"
                id="user"
                placeholder="user id"
                onChange={handleChange}
                value={task.user._id}
                name="user"
                disabled
              />
            </div>

            <div className="form-group p-4">
              <label htmlFor="taskId">Task id</label>
              <input
                type="text"
                className="form-control"
                id="taskId"
                placeholder="Id task"
                onChange={handleChange}
                value={task._id}
                name="id"
                disabled
              />
            </div>


            <div className="form-group p-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Título"
                onChange={handleChange}
                value={task.title}
                name="title"
              />
              {error ? <Error mensaje="El título es obligatorio" /> : null}
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
            <div 
            className="row d-flex">
            <div className="col-md-6">
                <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
            <div className="col-md-6">
            <a href="/table" className="m-5">
              Back to table
            </a>
          </div>
            
            </div>
       

          </form>
        </div>
      </div>
      ) : (
        <div className="container">
        <div className="alert alert-danger" role="alert">
        <a className="link-dark" href="/"><strong>You must be logged in to create a task!</strong></a>
      </div>
      </div>
      )}
    </div>
  );
};

  

export default Formulario;
