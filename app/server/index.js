const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

const router = require('./router');
const app = express();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_END_PORT}`,
  credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(router);

app.listen(process.env.PORT, ()=> console.log(`Running at http://localhost:${process.env.PORT}/`));
