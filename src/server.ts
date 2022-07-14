import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import app  from './app';


const port = process.env.PORT || 3000;
const host = process.env.HOST!;

(async () => {
    await mongoose
        .connect(process.env.DATABASE_LOCAL!)
        .then(() => {
            console.log('Connection established successfully');
        })
        .catch ((err) => {
            console.log('Error: Failed to connect to database: ', err);
        })
})();


app.listen(port, () => {
    console.log(`The server is running on http://${host}:${port}`);
});