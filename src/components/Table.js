import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Table = ({data, setData, setTask, isLogged}) => {

    const navigate = useNavigate()

    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [busqueda, setBusqueda] = useState("");

  
    const getDataUserId = async (userId) => {
        try {
        const url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
        const response = await axios.get(url);
        setData(response.data);
        } catch (error) {
        console.log(error);
        }
  }

useEffect(() => {
    if(isLogged) {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        getDataUserId(userId);
    }
}, [isLogged]);


 /*  useEffect(() => {
    if (data.length === 0) {
    getDataUserId(busqueda);
    }else{
     setTareasFiltradas(data);
    }
    }, [tareasFiltradas]); */

    const editarTarea = (tarea) => {
        setTask(tarea);
        navigate('/form');       
    }

    const eliminarTarea = (id) => {

        if (window.confirm('¿Are you sure? This cannot be undone.')) {
            const tareas = data.filter(tarea => tarea.id !== id);
            setData(tareas);
        } 
    }

    return (  

        <div className="App">
      <h1 className="mb-5">Lista de ToDo</h1>
      <div className="containerInput"> 
      <input
        type="number"
        className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Id de usuario"
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button 
          className="btn btn-success"
          onClick={() => getDataUserId(busqueda)}
          >
          
          <FontAwesomeIcon icon={faSearch}/>
        </button>
      </div>
        <div className="table-responsive">

        <button className="btn btn-primary d-flex" 
        onClick={() => 
        navigate('/form')
        }>
          Agregar Tarea
        </button>

          <table className="table table-striped">
            
            <thead>
              <tr>
                <th>UserId</th>
                <th>Title</th>
                <th>Completed</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((tarea) => (
                  <tr key={tarea.id}>
                    <td>{tarea.userId}</td>
                    <td>{tarea.title}</td>
                    <td>{tarea.completed ? <p>Yes</p> : <p>No</p>}</td>
                      <td><button
                        className="btn btn-primary"
                        onClick={() => editarTarea(tarea)}
                      >
                        Edit
                      </button>
                      <button
                      className="btn btn-danger"
                      onClick={() => eliminarTarea(tarea.id)}                    
                      >Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
   
 
export default Table;