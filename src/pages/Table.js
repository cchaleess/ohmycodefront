import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/UserService";
import TaskService from "../services/TaskService";

const Table = ({ data, setData, setTask, isLogged }) => {

  let user = localStorage.getItem("user");

  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const dataUser = async (id) => {
    new UserService().dataUser(id).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    if (isLogged) {
      dataUser(localStorage.getItem("id"));
    }
  }, [isLogged]);

  const editarTarea = (tarea) => {
    setTask(tarea);
    navigate("/form");
  };

 const agregarTarea = () => {
   
    setTask({
      user: localStorage.getItem("id"),
      id: "",
      title: "",
      completed: false,
    });
    navigate("/form");
  };



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    isLogged(false);
    navigate("/");
  }


  const eliminarTarea = (id) => {
    if (window.confirm("¿Are you sure? This cannot be undone.")) {
      // Delete the item from the API
      new TaskService().deleteTask(id).then((res) => {
        if (res.status === 200) {
          alert("Tarea eliminada");
          // lo borro del state
          const tareas = data.filter((tarea) => tarea._id !== id);
          setData(tareas);
          navigate("/table");
        }
      });
    }
  };

  return (

      
    <div className="App"> 
     
     {isLogged ? (  
      <div className="container">
           <div className="col-sm-6 pr-1 pl-1">
            <p >Welcome: <strong>{user}</strong></p>
            </div>
            <div className="col-sm-6">
            <button className="btn btn-danger" onClick={() => logout}>Logout</button>
          </div>
           
      <h1 className="mb-5 p-4">Todo List OhMyCode</h1>
      <div className="containerInput">
      
            <button className="btn btn-primary btn-lg m-auto" onClick={() => agregarTarea() }>
            <FontAwesomeIcon icon={faPlus} />Add Task
            </button>

         
         
        <input
          type="text"
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Introducir Id de usuario"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => dataUser(busqueda)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id User</th>
              <th>Id Todo</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((tarea) => (
                <tr key={tarea._id}>
                  <td>{tarea.user._id}</td>
                  <td>{tarea._id}</td>
                  <td>{tarea.title}</td>
                  <td>
                    {tarea.completed ? <p>Completed</p> : <p>Not completed</p>}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => editarTarea(tarea)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarTarea(tarea._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
        <div className="alert alert-danger" role="alert">
          <a className="link-dark" href="/"><strong>You must be logged in to see this page!</strong></a>
        </div>
      )}
  
      </div>  
      )  
}

export default Table;
