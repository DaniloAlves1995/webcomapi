const express = require('express');

//recebe o hash MD5 que é unico dessa aplicação, para gerar o token a partir dele
const authConfig = require('../../config/auth');
const Menssage = require('../models/menssage');
//const mailer = require('../../modules/mailer');

const router = express.Router();

//configura a rota de registro
router.post('/register', async(req, res) => {
    try{
        //apaga o campo de password
        const mens = await Menssage.create(req.body);//await é pra ele aguardar a criação

        return res.send({ 
            mens
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha de Registro'});
    }
});

//rota para retornar menssagens de acordo com os ids
router.get('/:menssageId', async (req, res) => {
    try{
        var ids = req.params.menssageId.split("&");
        var ids_p = [ids[0]+" "+ids[1], ids[1]+" "+ids[0]];
        const menssages = await Menssage.find({idsUsuarios: {$in: ids_p}});
        //o populate serve para ele buscar o valor dos dados do relacionamento e n somente o id
        

        return res.send({ menssages });
    }catch (e) {
        return res.status(400).send({ error: 'Erro ao carregar menssagens' });
    }
}); 

module.exports = app => app.use('/menssage', router);