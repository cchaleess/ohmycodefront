import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/Table";
import Formulario from "./components/Formulario";
import Login from "./pages/Login";

function App() {

  const [data, setData] = useState([]);
  const [task, setTask] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });
  const [isLogged, setIsLogged] = useState(false);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const getData = async () => {
    await axios
      .get("http://localhost:4000/api/todos")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
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
          element={<Formulario task={task} handleChange={handleChange} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
