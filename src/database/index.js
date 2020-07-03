const mongoose = require('mongoose');

//conecto com o bd
//MongoCliente é uma forma de conectar com o mongo, como o PDO
mongoose.connect('mongodb+srv://webcomapi:webcomapi3@cluster0.bwidn.mongodb.net/webcomapi?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;

//exporta o mongoose com a conexão
module.exports = mongoose;