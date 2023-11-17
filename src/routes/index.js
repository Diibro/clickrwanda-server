const mainRouter = require('express').Router();

const categoryRouter = require('./category');
const subCatRouter = require('./sub_category');
const userRouter = require('./user');
const advertRouter = require('./advert');
const payMethodRouter = require('./payment_method');
const paymentPlanRouter = require('./payment_plan');

mainRouter.use('/users', userRouter);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/advert', advertRouter);
mainRouter.use('payment-methods', payMethodRouter);
mainRouter.use('/sub-category', subCatRouter);
mainRouter.use('/payment-plan', paymentPlanRouter);


module.exports = mainRouter;