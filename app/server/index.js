const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.listen(PORT, ()=> console.log(`Running at http://localhost:${PORT}/`));
