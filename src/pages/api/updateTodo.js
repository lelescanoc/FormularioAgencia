const mongoose = require('mongoose')
import Paquete from '../../../model/Todo'

async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }

    const { id } = req.query
    const { paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas } = req.body

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/formularioagencia', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => console.log(' DB connected'))
    } catch (error) {
        console.log(error)
    }

    try {
        const updatedTodo = await Paquete.findByIdAndUpdate(id, { paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas })
        console.log(updatedTodo)
        res.status(500).json(updatedTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Not updated" })
    } finally {
        mongoose.connection.close()
    }

}

export default handler