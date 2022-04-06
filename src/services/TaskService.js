class TaskService {
  getAllTasks = async () => {
    try {
      const url = "http://localhost:4000/api/todos";
      const respuesta = await fetch(url);
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  createTask = async (task) => {
    delete task.id;
    task.user = localStorage.getItem("id");

    try {
      const url = "http://localhost:4000/api/todos";
      const respuesta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await respuesta;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  deleteTask = async (id) => {
    try {
      const url = `http://localhost:4000/api/todos/${id}`;
      const respuesta = await fetch(url, {
        method: "DELETE",
      });
      const resultado = await respuesta;
      return resultado;
    } catch (error) {
      console.log(error);
    }
  };

  updateTask = async (task) => {
    try {
      console.log(task._id);
      const url = "http://localhost:4000/api/todos/" + task._id;
      const respuesta = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const resultado = await respuesta;
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  };
}

export default TaskService;
