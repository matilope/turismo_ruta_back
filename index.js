import express from 'express';
import router from "./routes/contact.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(cors());

// Routes
app.use('', router.get('', (req, res) => {
    return res.send({
        status: 200,
        mensaje: 'API de turismo Ruta'
    });
}));

app.use('/api', router);

// Connection
app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});