const mongoose = require('../../database');
//importa a biblioteca de encriptação
const bcrypt = require('bcryptjs');

//O Schema é a estrutura dos dados que uma entidade vai ter
//require = obrigatoriedade
//lowercase = força a ser minusculo
//select = indica se o campo pode ser selecionado em uma busca
const MenssageSchema = new mongoose.Schema({
    idsUsuarios: {
        type: String,
        required: true,
    },
    idRem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    idDest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});


//define um model com o schema criado
const Menssage = mongoose.model('Menssage', MenssageSchema);
module.exports = Menssage;