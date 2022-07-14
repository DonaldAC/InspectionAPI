import * as fs from 'fs';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import Inspection from '../models/inspectionModel';
import { InspectionType } from '../interfaces/inspection.interface';


(async () => {
    await mongoose
        .connect(process.env.DATABASE_LOCAL!)
        .then(() => {
            console.log('Connection established successfully');
        })
        .catch ((err) => {
            console.log('Failed to connect to the database: ', err);
        })
})();

let inspectionData = JSON.parse(fs.readFileSync(`${__dirname}/inspections.json`, 'utf-8'));

inspectionData.forEach((el: InspectionType) => {
   delete el._id;
});

const importData = async () => {
    try {
        await Inspection.create(inspectionData);
        console.log('Data successfully loaded');
        process.exit();
    } catch (err) {
        console.log('Failed to import the data into the database: ', err);
    }
}

const deleteData = async () => {
    try {
        await Inspection.deleteMany();
        console.log('Data successfully deleted');
        process.exit();
    } catch (err) {
        console.log('Failed to delete the data from the database: ', err);
    }
};

// Call the function in the command line
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
