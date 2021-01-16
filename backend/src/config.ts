import dotenv from 'dotenv';
dotenv.config();


export const config = {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'login-react-youtube',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    SECRET_CODE: 'secretcode123',
}

