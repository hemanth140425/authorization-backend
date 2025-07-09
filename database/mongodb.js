import mongoose from 'mongoose';
import { DB_URI , NODE_ENV } from '../config/env.js';
if(!DB_URI) throw new Error('DB_URI is not defined');
console.log('DB_URI:', DB_URI);
console.log('NODE_ENV:', NODE_ENV);
const connectToMongo = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToMongo;