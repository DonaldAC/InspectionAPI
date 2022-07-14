import * as express from 'express';
import * as morgan from 'morgan';
import { ErrorHandler, globalErrorHandler } from './helpers/errorHandler';
import  inspectionRouter  from './routes/inpectionRoute';

const app = express();

// Middlewares
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());  
app.use(express.urlencoded({ extended: true}))


app.use('/api/v1/inspections', inspectionRouter);

app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler)

export default app;