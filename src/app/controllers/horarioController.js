const express = require('express');

//recebe o hash MD5 que é unico dessa aplicação, para gerar o token a partir dele
const authConfig = require('../../config/auth');
const Horario = require('../models/horario');
//const mailer = require('../../modules/mailer');

const router = express.Router();

//configura a rota de registro
router.post('/register', async(req, res) => {
    try{
        //apaga o campo de password
        const mens = await Horario.create(req.body);//await é pra ele aguardar a criação

        return res.send({ 
            mens
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha de Registro'});
    }
});

//rota para retornar menssagens de acordo com os ids
router.post('/gethorario', async (req, res) => {
    try{
        const { id, tipo } = req.body;
        var busca;
        if(tipo === 'medico')
            busca = {id_medico: id};
        else
            busca = {id_paciente: id};
      
        const horarios = await Horario.find(busca);
        //o populate serve para ele buscar o valor dos dados do relacionamento e n somente o id
        console.log("horarios = "+horarios);
        var horarios_saida = [];
        horarios.forEach( (element) => {
            
            var date1 = new Date(element.data.substring(0, element.data.length-6));
            var date2 = new Date();
            console.log("data banco = "+date1);
            console.log("data atual = "+date2);

            var diferenca = date1 - date2; //diferença em milésimos e positivo
            var dia = 1000*60*60; // milésimos de segundo correspondente a um dia
            var total = Math.round(diferenca/dia); //valor total de dias arredondado 
            var emHoras = Math.round(total) - 3; //diferença de horas do servidor
           
            if(emHoras>-1)
                horarios_saida.push(element);
        })

        return res.send({ horarios_saida });
    }catch (e) {
        console.log(e);
        return res.status(400).send({ error: 'Erro ao carregar menssagens' });
    }
}); 

module.exports = app => app.use('/horario', router);