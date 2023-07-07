const mongoose = require('mongoose')

import multer from 'multer';
import Paquete from '../../../model/Todo'
import path from 'path';
import fs from 'fs';




const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('paq_imagen');
//const upload = multer({ dest: '/uploads' }).single('paq_imagen')

async function handler(req, res) {
    upload(req, res, async (err) => {


        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        try {
            const { paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas } = req.body;

            console.log(req.file);

            // if (!paq_imagen) {
            //     paq_imagen = null; // Otra opción es asignar un valor predeterminado o lanzar un error
            // } else {
            //     // Lectura del archivo y guardado en MongoDB
            //     const imageBuffer = await fs.promises.readFile(path.join('uploads', path.basename(paq_imagen)));
            //     //const imageBuffer = fs.readFileSync(paq_imagen);
            //     paq_imagen = imageBuffer;
            // }

            await mongoose.connect('mongodb://127.0.0.1:27017/formularioagencia', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => console.log(' DB connected'))


            var newTodo = new Paquete({ paq_nombre, paq_descripcion, paq_precio, paq_incluye, paq_no_incluye, paq_restricciones, paq_observaciones, paq_duracion, paq_personas });
            await newTodo.save();
            console.log(newTodo);

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal error" })
        } finally {
            mongoose.connection.close()
        }
    });
};

export default handler;