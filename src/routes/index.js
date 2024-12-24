const mainRouter = require('express').Router();
const {checkUpload} = require('../middlewares/uploadCheck');

const categoryRouter = require('./category');
const subCatRouter = require('./sub_category');
const userRouter = require('./user');
const advertRouter = require('./advert');
const paymentPlanRouter = require('./payment_plan');
const ReviewRouter = require('./review');
const quotationRouter = require('./quotation');
const agentRouter = require("./agent");
const viewRouter = require('./webView');
const agentPayRouter = require("./agentPayment");
const fileUploadRouter = require("./fileUpload");
const PlanSubscriptionRouter = require('./planSubscription');
const AgentTaskRouter = require('./agentTask');
const AdminRouter = require('./admin');
const CommissionAdsClientsRouter = require('./CommissionAdsClients');
const BlogRouter = require('./Blog');
const bannerRouter = require('./banner');

mainRouter.use('/users', userRouter);
mainRouter.use('/category', categoryRouter);
mainRouter.use('/advert', advertRouter);
mainRouter.use('/sub-category', subCatRouter);
mainRouter.use('/payment-plan', paymentPlanRouter);
mainRouter.use('/review', ReviewRouter);
mainRouter.use('/quotation', quotationRouter);
mainRouter.use("/agent", agentRouter);
mainRouter.use("/web-view", viewRouter);
mainRouter.use('/agent-pay', agentPayRouter);
mainRouter.use('/file-upload', fileUploadRouter);
mainRouter.use('/plan-subscription', PlanSubscriptionRouter)
mainRouter.use('/agent-task', AgentTaskRouter);
mainRouter.use('/commission-ads-clients', CommissionAdsClientsRouter);
mainRouter.use('/admin', AdminRouter);
mainRouter.use('/blog', BlogRouter);
mainRouter.use('/banner', bannerRouter);
mainRouter.get('/', (req, res) => {
     res.json({Status: "pass", message: "Server is up and running"});
});

mainRouter.use(checkUpload);

mainRouter.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Internal Server Error' });
});
module.exports = mainRouter;