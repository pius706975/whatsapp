const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const logger = require('../utils/logger');

const waClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-gpu'],
    },
    webVersionCache: {
        type: 'remote',
        remotePath:
            'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
});

waClient.on('qr', (qr) => qrcode.generate(qr, { small: true }));
waClient.on('ready', () => logger.info('Client is ready!'));
waClient.on('message', async (msg) => {
    try {
        if (msg.from !== 'status@broadcast') {
            const contact = await msg.getContact();
            console.log(contact, msg.body);
        }
    } catch (error) {
        logger.error(error.message);
    }
});

module.exports = waClient;
