import * as express from 'express';
import { InspectionController } from '../controllers/inpectionController';

const router = express.Router();

const routeController = new InspectionController();

router
    .route('/')
    .get(routeController.getAllInspections)
    .post(routeController.createInspection);

router
    .route('/:id')
    .get(routeController.getInspectionById)
    .patch(routeController.updateInspection)
    .delete(routeController.deleteInspection);

export default router;