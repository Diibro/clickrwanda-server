const mainRouter = require('express').Router();
const {checkUpload} = require('../middlewares/uploadCheck');

const categoryRouter = require('./category');
const subCatRouter = require('./sub_category');
const userRouter = require('./user');
const advertRouter = require('./advert');
const paymentPlanRouter = require('./payment_plan');
const ReviewRouter = require('./review');
const quotationRouter = require('./quotation');


mainRouter.use('/users', userRouter);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/advert', advertRouter);
mainRouter.use('/sub-category', subCatRouter);
mainRouter.use('/payment-plan', paymentPlanRouter);
mainRouter.use('/review', ReviewRouter);
mainRouter.use('/quotation', quotationRouter);
mainRouter.get('/', (req, res) => {
     res.json({Status: "pass", message: "Server is up and running"});
});

mainRouter.use(checkUpload);

mainRouter.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Internal Server Error' });
});
module.exports = mainRouter;