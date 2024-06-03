const waClient = require('./wa.service');

const waClientController = async (req, res) => {
    const { recipient, message } = req.body;
    waClient.sendMessage(recipient, message);
    res.send();
};

module.exports = waClientController;
