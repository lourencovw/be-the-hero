const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate')

const app = express();

app.use(cors());
app.use(express.json()); // Transforma todas as requisiçoes em formato json
app.use(routes);
app.use(errors());

// app.listen(3333)
module.exports = app;