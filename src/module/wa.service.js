const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const logger = require('../utils/logger');

// Session data directory
const SESSION_DIR = './session';
let waClient = null;

if (fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
}

const checkConnection = async () => {
    try {
        await axios.get('https://www.google.com');
        return true;
    } catch (error) {
        return false;
    }
};

const initializeClient = async () => {
    const connectionChecker = async () => {
        const connectionStatus = await checkConnection();
        if (!connectionStatus) {
            logger.error('No internet connection. Please check your network');
        }
    };

    if (!waClient) {
        try {
            waClient = new Client({
                authStrategy: new LocalAuth({
                    dataPath: SESSION_DIR,
                }),
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

            waClient.on('authenticated', () => {
                logger.info('Authenticated successfully');
                const session = fs.readdirSync(SESSION_DIR);
                if (session.length > 0) {
                    logger.info(`Session: ${session}`);
                } else {
                    logger.warn('No session found');
                }
            });

            waClient.on('message', async (msg) => {
                try {
                    if (msg.from !== 'status@broadcast') {
                        const contact = await msg.getContact();
                        console.log(contact, msg.body);
                        // logger.log(contact, msg.body);
                    }
                } catch (error) {
                    logger.error(error.message);
                }
            });

            waClient.on('disconnected', (reason) => {
                logger.error(`Client disconnected: ${reason}. Reconnecting...`);
                connectionChecker();
            });

            logger.info('waClient initialized successfully');
            await waClient.initialize();
        } catch (error) {
            logger.error('Error initializing waClient:', error);
        }
    }
};

initializeClient();

process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception:', err);
    initializeClient();
});

module.exports = waClient;
