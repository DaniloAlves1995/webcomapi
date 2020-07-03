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
        
        var horarios_saida = [];
        horarios.forEach( (element) => {
            console.log("hora_banco = "+new Date(element.data).getUTCHours());
            console.log("hora_atual = "+new Date().getUTCHours()-5);
            var hours = Math.abs(((new Date().getHours()-5)*60+new Date().getMinutes()) - (new Date(element.data).getUTCHours()*60+new Date(element.data).getUTCMinutes()))/60;
            console.log("horas = "+hours);
            if(hours<=1)
                horarios_saida.push(element);
        })

        return res.send({ horarios_saida });
    }catch (e) {
        console.log(e);
        return res.status(400).send({ error: 'Erro ao carregar menssagens' });
    }
}); 

module.exports = app => app.use('/horario', router);