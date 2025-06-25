const { Usuarios } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function postUsers(req, res) {
    try {
        const { nome, email, senha } = res.body;

        if (!nome || !email || !senha) {
            return `❌ DADOS ENVIADOS INCORRETOS: NOME:${nome} | EMAIL:${email} | SENHA:${senha}`
        }


        console.log('✅ USUARIOS GRAVADOS COM SÚCESSO')
    } catch (error) {
        console.log('❌ ERRO NA TENTATIVA DE GRAVAR USUARIOS:', error);
    }
}