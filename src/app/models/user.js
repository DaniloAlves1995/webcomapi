const mongoose = require('../../database');
//importa a biblioteca de encriptação
const bcrypt = require('bcryptjs');

//O Schema é a estrutura dos dados que uma entidade vai ter
//require = obrigatoriedade
//lowercase = força a ser minusculo
//select = indica se o campo pode ser selecionado em uma busca
const UserSchema = new mongoose.Schema({
    primeiroNome: {
        type: String,
        required: true,
    },
    segundoNome: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    tipo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//antes de salvar
UserSchema.pre('save', async function(next){
    //o this aqui se refere ao objeto que está sendo salvado
    //esse numero é a qtd de vezes que o hash é gerado
    const hash = await bcrypt.hash(this.senha, 10); 
    this.senha = hash;

    next();
});

//define um model com o schema criado
const User = mongoose.model('User', UserSchema);
module.exports = User;