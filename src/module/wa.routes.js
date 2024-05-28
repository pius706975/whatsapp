const waClientRouter = require('express').Router();
const waClientController = require('./wa.controller');

waClientRouter.post('/send-wa-message', waClientController);

module.exports = waClientRouter;
