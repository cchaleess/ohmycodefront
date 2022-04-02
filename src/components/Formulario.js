import React,{useState} from 'react'

const Formulario = ({task, handleChange}) => {

    const [error , setError] = useState({});    
    
    const validate = () => {
        let error = {};
        if(task.userId <= 0){
            error.userId = 'El Id debe ser mayor a 0';
        }
        if(task.title.length === 0 || task.title.length > 200 ){
            error.title = 'Debe ingresar un título y que sea menor a 200 caracteres';
        }
        setError(error);
        return Object.keys(error).length === 0;
    }

        

    const handleSubmit = (e) => {
        e.preventDefault();      
        validate();
          console.log(task);
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4">
                    <h3 className="text-center">Agregar Tarea</h3>

                <form onSubmit={handleSubmit}>
                    <div className="form-group p-4">
                        <label htmlFor="userId">Id de usuario</label>
                        <input type="number" className="form-control" id="userId" placeholder="Id de usuario"
                            onChange={handleChange} value={task.userId} name="userId" />
                        {error.userId && <p className="text-danger">{error.userId}</p>}
                    </div>

                    <div className="form-group p-4">
                        <label htmlFor="title">Título</label>
                        <input   type="text" className="form-control" id="title" placeholder="Título" 
                        onChange={handleChange} value={task.title} name="title" />
                        {error.title && <p className="text-danger">{error.title}</p>}
                    </div>

                    <div className="form-group p-4">
                        <label htmlFor="completed">Completado</label>
                        <select className="form-control" id="completed" 
                        onChange={handleChange} name="completed" value={task.completed} >
                            <option value={true}>Completed</option>
                            <option value={false}>Not Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
                </div>
                </div>         
        </div>

    )
}

export default Formulario;
