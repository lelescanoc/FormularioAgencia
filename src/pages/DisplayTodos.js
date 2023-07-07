import React, { useState } from 'react'
import Axios from 'axios'

export async function getStaticProps() {
    const mongoose = require('mongoose')
    const Paquete = require('../../model/Todo')

    await mongoose.connect('mongodb://127.0.0.1:27017/formularioagencia', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const paquetes = await Paquete.find()

    console.log(paquetes)
    return {
        props: {
            paquetes: JSON.parse(JSON.stringify(paquetes)),
        }
    }

}

const DisplayTodos = ({ paquetes }) => {
    const [visibility, setVisibility] = useState(false)
    const [paq_nombre, setPaq_nombre] = useState('')
    const [paq_descripcion, setPaq_descripcion] = useState('')
    const [paq_precio, setPaq_precio] = useState('')
    const [paq_incluye, setPaq_incluye] = useState([])
    const [paq_no_incluye, setPaq_no_incluye] = useState('')
    const [paq_restricciones, setPaq_restricciones] = useState('')
    const [paq_observaciones, setPaq_observaciones] = useState('')
    const [paq_duracion, setPaq_duracion] = useState('')
    const [paq_personas, setPaq_personas] = useState('')
    const [todoId, setTodoId] = useState('')




    // const [title, setTitle] = useState('')
    // const [todo, setTodo] = useState('')
    // const [todoId, setTodoId] = useState('')

    const editForm = (paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas, todoId) => {
        setVisibility(visibility => !visibility)
        setPaq_nombre(paq_nombre)
        setPaq_descripcion(paq_descripcion)
        setPaq_precio(paq_precio)
        setPaq_incluye(paq_incluye)
        setPaq_no_incluye(paq_no_incluye)
        setPaq_restricciones(paq_restricciones)
        setPaq_observaciones(paq_observaciones)
        setPaq_duracion(paq_duracion)
        setPaq_personas(paq_personas)

        setTodoId(todoId)
    }

    const updateTodo = async (todoId) => {
        const todoObj = {
            paq_nombre: paq_nombre,
            paq_descripcion: paq_descripcion,
            paq_precio: paq_precio,
            paq_incluye: paq_incluye,
            paq_no_incluye: paq_no_incluye,
            paq_restricciones: paq_restricciones,
            paq_observaciones: paq_observaciones,
            paq_duracion: paq_duracion,
            paq_personas: paq_personas

        }
        console.log(todoObj)
        await Axios.put(`/api/updateTodo?id=${todoId}`, todoObj)
            .then(() => {
                window.location.reload(false)
            })
    }

    const deleteTodo = (todoId) => {
        Axios.delete(`/api/deleteTodo?id=${todoId}`).then(() => {
            window.location.reload(false)
        })
    }

    return (
        <>
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre Paquete</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Incluye</th>
                            <th scope="col">No incluye</th>
                            <th scope="col">Restricciones</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col">Duracion</th>
                            <th scope="col">Numero de Personas</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paquetes && paquetes.map((element) => {
                            return (
                                <tr key={element._id}>
                                    <td>{element.paq_nombre}</td>
                                    <td>{element.paq_descripcion}</td>
                                    <td>S/.{element.paq_precio}</td>
                                    <td>
                                        {element.paq_incluye.map((item, index) => (
                                            <p key={item}>{`${index + 1}. ${item}`}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {element.paq_no_incluye.map((item, index) => (
                                            <p key={item}>{`${index + 1}. ${item}`}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {element.paq_restricciones.map((item, index) => (
                                            <p key={item}>{`${index + 1}. ${item}`}</p>
                                        ))}
                                    </td>
                                    <td>
                                        {element.paq_observaciones.map((item, index) => (
                                            <p key={item}>{`${index + 1}. ${item}`}</p>
                                        ))}
                                    </td>

                                    <td>{element.paq_duracion}</td>
                                    <td>{element.paq_personas}  Personas</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteTodo(element._id)}>Delete</button>
                                        <button className="btn btn-primary" onClick={(paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas, todoId) => editForm(element.paq_nombre, element.paq_descripcion, element.paq_precio, element.paq_incluye, element.paq_no_incluye, element.paq_restricciones, element.paq_observaciones, element.paq_duracion, element.paq_personas, element._id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {visibility && <div className='container'>
                <h1>Actualizar paquete</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="paq_nombre" className="form-label">Nombre de Paquete</label>
                        <input type="text" className="form-control" id="paq_nombre" aria-describedby="emailHelp" value={paq_nombre} onChange={(event) => setPaq_nombre(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_descripcion" className="form-label">Descripcion de Paquete</label>
                        <input type="text" className="form-control" id="paq_descripcion" aria-describedby="emailHelp" value={paq_descripcion} onChange={(event) => setPaq_descripcion(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_precio" className="form-label">Precio de Paquete</label>
                        <input type="text" className="form-control" id="paq_precio" aria-describedby="emailHelp" value={paq_precio} onChange={(event) => setPaq_precio(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_incluye" className="form-label">Incluye en el Paquete</label>
                        <input type="text" className="form-control" id="paq_incluye" aria-describedby="emailHelp" value={paq_incluye} onChange={(event) => setPaq_incluye(event.target.value)} />
                    </div>



                    <div className="mb-3">
                        <label htmlFor="paq_no_incluye" className="form-label">No Incluye en el Paquete</label>
                        <input type="text" className="form-control" id="paq_no_incluye" aria-describedby="emailHelp" value={paq_no_incluye} onChange={(event) => setPaq_no_incluye(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_restricciones" className="form-label">Restricciones del Paquete</label>
                        <input type="text" className="form-control" id="paq_restricciones" aria-describedby="emailHelp" value={paq_restricciones} onChange={(event) => setPaq_restricciones(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_observaciones" className="form-label">Observaciones del Paquete</label>
                        <input type="text" className="form-control" id="paq_observaciones" aria-describedby="emailHelp" value={paq_observaciones} onChange={(event) => setPaq_observaciones(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_duracion" className="form-label">Duracion del Paquete</label>
                        <input type="text" className="form-control" id="paq_duracion" aria-describedby="emailHelp" value={paq_duracion} onChange={(event) => setPaq_duracion(event.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="paq_personas" className="form-label">Numero de Personas por Paquete</label>
                        <input type="text" className="form-control" id="paq_personas" aria-describedby="emailHelp" value={paq_personas} onChange={(event) => setPaq_personas(event.target.value)} />
                    </div>

                    {/* <div className="mb-3">
                        <label for="todo" className="form-label">Todo</label>
                        <input type="text" className="form-control" id="todo" value={todo} aria-describedby="emailHelp" onChange={(event) => setTodo(event.target.value)} />
                    </div> */}





                    <button type="submit" className="btn btn-primary" onClick={() => updateTodo(todoId)}>Submit</button>
                    <button className="btn btn-danger" onClick={() => setVisibility(visibility => !visibility)}>Cancel</button>
                </form>
            </div>}
        </>
    )
}

export default DisplayTodos