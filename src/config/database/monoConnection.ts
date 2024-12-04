import mongoose from "mongoose";

export const connectToMongoDB = async (mongoURI: string, retries: number = 5, delay: number = 5000) => {
    let attempts = 0;

    const connect = async () => {
        try {
            await mongoose.connect(mongoURI, { dbName: "node-api" });
            console.log("MongoDB conectado!");
        } catch (error) {
            attempts++;
            console.error(`Erro ao conectar ao MongoDB. Tentativa ${attempts} de ${retries}:`, error);

            if (attempts < retries) {
                console.log(`Tentando novamente em ${delay / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, delay)); // Espera o tempo definido
                await connect(); // Tenta novamente
            } else {
                console.error('Não foi possível conectar ao MongoDB após várias tentativas.');
                process.exit(1); // Encerra o processo após falhas sucessivas
            }
        }
    };

    await connect();
};
