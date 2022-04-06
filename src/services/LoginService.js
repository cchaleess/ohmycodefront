class LoginService {

    createUser = async (user) => {
        try {
            const url = "http://localhost:4000/api/users";
            const respuesta = await fetch(url, {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(respuesta);
            return respuesta;
          } catch (error) {
            console.log(error);
          }
        };

    login = async (user) => {
        try {
            const url = "http://localhost:4000/api/users/login";
            const respuesta = await fetch(url, {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json",
              }
            }).then((response) => {
                return response.json();
            }
            );
            return respuesta;
          } catch (error) {
            console.log(error);
          }
        };
}
export default LoginService;