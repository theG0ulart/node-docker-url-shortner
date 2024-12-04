import mongoose, { Schema, Document } from 'mongoose';

export interface IURL extends Document {
    originURL: string; // URL original
    hash: string;      // Identificador único para encurtar
    shortURL: string;  // URL encurtada
}

const URLSchema: Schema = new Schema({
    originURL: { 
        type: String, 
        required: true, 
        unique: true 
    },
    hash: { 
        type: String, 
        required: true, 
        unique: true 
    },
    shortURL: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, {
    timestamps: true // Adiciona os campos createdAt e updatedAt
});

// Exporta o modelo
export const URL = mongoose.model<IURL>('URL', URLSchema);
