import express from 'express';
import nodemailer from "nodemailer";
import validator from "validator";
import rateLimit from "express-rate-limit";

let router = express.Router();

export default router.post("/formulario", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASS
        }
    });

    if (!validator.isEmpty(req.body.nombre && req.body.correo && req.body.consulta)) {
        const mailOptions = {
            from: `"Turismo Ruta" ${process.env.CORREO}`,
            to: `${process.env.CORREO}`,
            subject: "Te han contactado en Turismo Ruta",
            html: `<ul style="line-height:30px;"><li><strong>Nombre: </strong>${req.body.nombre}</li><li><strong>Correo: </strong>${req.body.correo}</li><li><strong>Consulta: </strong>${req.body.consulta}</li></ul>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
                res.status(200).json({
                    message: 'Enviado exitosamente'
                });
            }
        });
    }
}
);
