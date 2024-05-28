require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const logger = require('./src/utils/logger');
const response = require('./src/utils/api.responses');
const waClient = require('./src/module/wa.service');
const waClientRouter = require('./src/module/wa.routes');

waClient.initialize();

const PORT = process.env.PORT || 1232;

const corsOptions = {
    origin: '*',
    credential: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(waClientRouter);

app.all('*', (req, res, _next) => response(res, 200, 'This is base url'));

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
