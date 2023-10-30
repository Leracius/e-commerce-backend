import { Router } from "express";
import * as path from 'path';

const router = Router();


router.get('/', (req, res) => {
    const htmlContent = `
        <html>
            <head>
                <title>e-commerce API </title>
            </head>
            <body>
                <h1>Hecho por Axel Quintana.</h1>
                <p>Encuentra la documentación en <a href="https://documenter.getpostman.com/view/28688697/2s9YRGypU9">view documentation</a>.</p>
            </body>
        </html>
    `;
    
    res.send(htmlContent);
});
export default router