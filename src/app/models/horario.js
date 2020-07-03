const mongoose = require('../../database');

//O Schema é a estrutura dos dados que uma entidade vai ter
//require = obrigatoriedade
//lowercase = força a ser minusculo
//select = indica se o campo pode ser selecionado em uma busca
const HorarioSchema = new mongoose.Schema({
    id_medico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    id_paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//define um model com o schema criado
const Horario = mongoose.model('Horario', HorarioSchema);
module.exports = Horario;