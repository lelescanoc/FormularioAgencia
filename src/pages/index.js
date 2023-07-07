import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import Axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [paq_nombre, setPaq_nombre] = useState('')
  const [paq_descripcion, setPaq_descripcion] = useState('')
  const [paq_precio, setPaq_precio] = useState('')
  const [paq_incluye, setPaq_incluye] = useState('')
  const [paq_no_incluye, setPaq_no_incluye] = useState('')
  const [paq_restricciones, setPaq_restricciones] = useState('')
  const [paq_observaciones, setPaq_observaciones] = useState('')
  const [paq_duracion, setPaq_duracion] = useState('')
  const [paq_personas, setPaq_personas] = useState('')
  const [paq_imagen, setPaq_imagen] = useState(null)




  const handleSubmit = () => {
    if (!paq_imagen) {
      alert('Debe seleccionar una imagen')
      return
    }
    const todoObj = {
      paq_nombre: paq_nombre,
      paq_descripcion: paq_descripcion,
      paq_precio: paq_precio,
      paq_incluye: paq_incluye.split(',').map(item => item.trim()),
      paq_no_incluye: paq_no_incluye.split(',').map(item => item.trim()),
      paq_restricciones: paq_restricciones.split(',').map(item => item.trim()),
      paq_observaciones: paq_observaciones.split(',').map(item => item.trim()),
      paq_duracion: paq_duracion,
      paq_personas: paq_personas,
      paq_imagen: paq_imagen

    }
    console.log(todoObj)
    Axios.post('/api/newTodo', todoObj)
      .then(() => {
        alert('Paquete added')
      })
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    setPaq_imagen(file)
  }


  return (
    <>
      <div className='container'>
        <h1>Añadir Nuevo Paquete</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="paq_nombre" className="form-label">Nombre de Paquete</label>
            <input type="text" className="form-control" id="paq_nombre" aria-describedby="emailHelp" onChange={(event) => setPaq_nombre(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_descripcion" className="form-label">Descripcion del Paquete</label>
            <input type="text" className="form-control" id="paq_descripcion" aria-describedby="emailHelp" onChange={(event) => setPaq_descripcion(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_precio" className="form-label">Precio del Paquete</label>
            <input type="text" className="form-control" id="paq_precio" aria-describedby="emailHelp" onChange={(event) => setPaq_precio(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_incluye" className="form-label">Incluye en el Paquete</label>
            <input type="text" className="form-control" id="paq_incluye" aria-describedby="emailHelp" onChange={(event) => setPaq_incluye(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_no_incluye" className="form-label">N incluye en el Paquete</label>
            <input type="text" className="form-control" id="paq_no_incluye" aria-describedby="emailHelp" onChange={(event) => setPaq_no_incluye(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_restricciones" className="form-label">Restricciones del Paquete</label>
            <input type="text" className="form-control" id="paq_restricciones" aria-describedby="emailHelp" onChange={(event) => setPaq_restricciones(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_observaciones" className="form-label">Observaciones del Paquete</label>
            <input type="text" className="form-control" id="paq_observaciones" aria-describedby="emailHelp" onChange={(event) => setPaq_observaciones(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_duracion" className="form-label">Duracion del Paquete</label>
            <input type="text" className="form-control" id="paq_duracion" aria-describedby="emailHelp" onChange={(event) => setPaq_duracion(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_personas" className="form-label">Cantidad de personas</label>
            <input type="text" className="form-control" id="paq_personas" aria-describedby="emailHelp" onChange={(event) => setPaq_personas(event.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="paq_imagen" className="form-label">Subir imagen</label>
            <input type="file" name="paq_imagen" className="form-control" id="paq_imagen" accept="image/*" onChange={handleImageUpload} />
          </div>
          {paq_imagen && (
            <div className='container'>
              <h2>Imagen seleccionada:</h2>
              {/* <Image src={URL.createObjectURL(paq_imagen)} alt="Imagen de Paquete" width={300} height={200} /> */}
              <img src={`data:image/jpeg;base64,${paq_imagen.toString('base64')}`} alt="Imagen de Paquete" width={300} height={200} />
            </div>
          )}


          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
