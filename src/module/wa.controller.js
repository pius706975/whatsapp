const logger = require('../utils/logger');
const waClient = require('./wa.service');

const waClientController = async (req, res) => {
    const { recipient, message } = req.body;
    waClient.sendMessage(recipient, message);
    res.send();
    logger.info(`Message sent successfully to ${recipient.split('@')[0]}`);
};

module.exports = waClientController;
