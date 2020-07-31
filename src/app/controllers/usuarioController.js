const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//recebe o hash MD5 que é unico dessa aplicação, para gerar o token a partir dele
const authConfig = require('../../config/auth');
const User = require('../models/user');
//const mailer = require('../../modules/mailer');

const router = express.Router();

//cria uma função para o token
//gerar token
    //para gerar um token, é enviado um campo que nunca muda e é unico para cada usuário
    //e um hash que é único para cada aplicação
    //o ultimo parametro é o tempo para expirar o token em segundos
function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

//configura a rota de registro
router.post('/register', async(req, res) => {
    //pega o valor do email que foi recebido como parametro pela chamada
    const { usuario } = req.body;
    
    try{

        //Caso já tenha o email cadastrado
        if(await User.findOne({ usuario }))
            return res.status(400).send({ error: 'Usuário já existe' });

        //apaga o campo de password
        const user = await User.create(req.body);//await é pra ele aguardar a criação
        user.senha = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Falha de Registro'});3
    }
});

//configura a rota de autenticação
router.post('/authenticate', async (req, res) => {
    const { usuario, senha } = req.body;

    //como o retorno é uma promise, deve utilizar o await, pq n é sincrono
    //adiciona esse select com +password para adicionar o campo de password que foi excluido no Scheme
    const user = await User.findOne({ usuario }).select('+senha');

    //caso n tenha o usuário no bd
    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado' });

    //caso as senhas n sejam inguais
    //utiliza o compare do bcrypt pq a senha vai estar encriptada
    if(!await bcrypt.compare(senha, user.senha))
        return res.status(400).send({ error: 'Senha incorreta!' });
    
    user.senha = undefined;
    
    

    res.send({ 
        user, 
        token: generateToken({ id: user.id }),
     });
});

//rota para retornar os usuários pelo id
router.get('/:usuariosId', async (req, res) => {
    try{
        var ids = req.params.usuariosId.split("&");
        var ids_p = [ids[0], ids[1]];
        const usuarios = await User.find({_id: {$in: ids_p}});
        //o populate serve para ele buscar o valor dos dados do relacionamento e n somente o id
        

        return res.send({ usuarios });
    }catch (e) {
        return res.status(400).send({ error: 'Erro ao carregar menssagens' });
    }
}); 

module.exports = app => app.use('/auth', router);