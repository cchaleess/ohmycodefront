import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import Formulario from "./components/Formulario";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import TaskService from "./services/TaskService";

function App() {

  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const [task, setTask] = useState({
    user: "",
    id: "",
    title: "",
    completed: false,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    }
  }, []);

 useEffect(() => {
   new TaskService().getAllTasks().then((res) => {
      setData(res);
    }
    );    
  }, []);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterUser handleChange={handleChange} />} />
        <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
        <Route
          path="table"
          element={
            <Table
              data={data}
              setData={setData}
              task={task}
              setTask={setTask}
              isLogged={isLogged}
            />
          }
        />
        <Route
          path="form"
          element={<Formulario task={task} handleChange={handleChange} isLogged={isLogged}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
