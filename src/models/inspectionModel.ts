import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    city: String,
    zip: Number,
    street: String,
    number: String
});

const inspectionSchema = new mongoose.Schema({
    id: { 
        type: String,
        required: [true, 'Inspection must have an ID'],
        unique: true,
        trim: true,
    },
    certificate_number: {
        type: String,
        required: [true, 'Inspection must have a certificate_number']
    },
    business_name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    result: {
        type: String,
        required: [true, 'Inpection must have a result'],
        trim: true
    },
    sector: {
        type: String,
        required: [true, 'Inpection must have a sector'],
        trim: true
    },
    address: {
        type: addressSchema,
        required: [true, 'Inpection must have a address details'],
    }
});


const Inspection = mongoose.model('Inspection', inspectionSchema);

export default Inspection