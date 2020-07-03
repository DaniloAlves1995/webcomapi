const express = require('express');
const bodyParser = require('body-parser');

//crio a aplicação
const app = express();

const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//configuro a aplicação a usar o badyparser para json e receber parametros da url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  { extended: false }
));

require('./app/controllers/index')(app);

app.listen(port);
console.log("API_port = "+port);