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
                <p>Encuentra la documentación en <a href="https://github.com/Leracius">mi github</a>.</p>
            </body>
        </html>
    `;
    
    res.send(htmlContent);
});
export default router