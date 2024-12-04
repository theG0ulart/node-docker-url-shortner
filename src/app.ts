import { URLController } from './controller/URLController';
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { connectToMongoDB } from './config/database/monoConnection';
import routes from './routes/routes';  // Alterei para usar import

dotenv.config();

const api = express();

// Configuração de middleware
api.use(express.json());

// Conexão ao MongoDB
const mongoURI = process.env.MONGO_URI || "";
connectToMongoDB(mongoURI);

// Definição da porta
const port = process.env.PORT || 5000;

// Utilização das rotas
api.use("/api", routes);

// Middleware para lidar com rotas não encontradas (404)
api.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Requested resource could not be found" });
});

// Início do servidor
api.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
