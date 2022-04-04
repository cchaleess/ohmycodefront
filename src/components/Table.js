import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = ({ data, setData, setTask, isLogged }) => {
  
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  const getDataUserId = async (userId) => {
    try {
      const url = `http://localhost:4000/api/todos/${userId}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isLogged) {
      const userId = JSON.parse(localStorage.getItem("user"));
      getDataUserId(userId);
    }
    // eslint-disable-next-line
  }, [isLogged]);

  const editarTarea = (tarea) => {
    setTask(tarea);
    navigate("/form");
  };

  const eliminarTarea = (id) => {
    if (window.confirm("¿Are you sure? This cannot be undone.")) {
      // Delete the item from the API
      const eliminarTarea = axios.delete(
        `http://localhost:4000/api/todos/${id}`
      );
      eliminarTarea.then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Tarea eliminada");
          // Delete the item from the local state
          const tareas = data.filter((tarea) => tarea._id !== id);
          setData(tareas);
          navigate("/table");
        }
      });
    }
  };

  return (
    <div className="App">
      <h1 className="mb-5">Lista de ToDo</h1>
      <div className="containerInput">
        <input
          type="text"
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Introducir Id de usuario"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          className="btn btn-success"
          onClick={() => getDataUserId(busqueda)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
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
  );
};

export default Table;
