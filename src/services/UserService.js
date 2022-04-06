class UserService {
  dataUser = async (id) => {
    try {
      const url = `http://localhost:4000/api/todos/${id}`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const response = await data.json();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
