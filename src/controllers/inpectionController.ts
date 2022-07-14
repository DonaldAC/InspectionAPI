import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Inspection from '../models/inspectionModel';
import InspectionArchive from '../models/inspectionArchiveModel';
import { QuerySearchOptions } from '../helpers/querySearchOptions'
import { ErrorHandler } from "../helpers/errorHandler";

export class InspectionController {
    
    async getAllInspections (req: any, res: any) {
        try {
            const queryOptions = new QuerySearchOptions(Inspection.find(), req.query)
                .filter()
                .sort()
                .pagination();

            const records = await queryOptions.query;

            res.status(200).json({
               status: 'success', 
               result: records.length,
               data: {
                   inspections: records
               }
            })
        } catch(err) {
            res.status(404).json({
                status: 'fail',
                message: 'Unable to retrieve all the inspections records.'
            })
        }
    }
    
    async getInspectionById (req: Request, res: Response, next: NextFunction) {
        try {
            const singleRecord = await Inspection.findById(req.params.id);

            if (!singleRecord) {
                return next(new ErrorHandler('record found with that ID', 404))
            }

            res.status(200).json({
               status: 'success',
               data: {
                   record: singleRecord
               }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: 'Error: The specified record was not found'
            });
        }
    };
    
    async createInspection (req: Request, res: Response) {
        try {
            const data = await Inspection.create(req.body);
        
            res.status(201).json({
                status: 'success',
                data: {
                     record: data,
                }
            }) 
    
        } catch (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Bad request: failed to create a new record'
            })
        }
    };
    
    async updateInspection (req: Request, res: Response, next: NextFunction) {
        try {
            const updateData = await Inspection.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });

            if (!updateData) {
                return next(new ErrorHandler('record not found with that ID', 404))
            }
    
            res.status(200).json({
                status: 'success',
                data: {
                    record: updateData,
                }
            });
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: 'Error: The specified record was not found'
            });
        }
    
    };
    

    // remove the inspection from the main collection and save it to the archive collection.
    async deleteInspection (req: Request, res: Response, Next: NextFunction) {
       try {
            Inspection.findOne({_id: req.params.id}, (err: any, result: any) => {
                if (!err) {
                    let doc = new InspectionArchive(result);
                    doc._id = new mongoose.Types.ObjectId();
                    doc.isNew = true;

                    doc.save();
                    
                    result.remove();
                    
                    res.status(204).json({
                        status: 'success',
                        record: null
                    });
                    
                } else {
                    return Next(new ErrorHandler('Not fount', 404))
                }
            })
       } catch (err) {
            res.status(404).json({
               status: 'fail',
               message: 'Error: The specified record was not fount'
        });
       }
    };

}
