const { Usuarios } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function postUsers(req, res) {
    try {
        const nomeSchema = z.string().min(4, 'Nome é obrigatório');
        const emailSchema = z.string().email('Email inválido');
        const senhaSchema = z.string().min(6, 'Senha deve ter pelo menos 6 caracteres');

        const usuarioSchema = z.object({
            nome: nomeSchema,
            email: emailSchema,
            senha: senhaSchema
        })

        const { nome, email, senha } = res.body;

        if (!nome || !email || !senha) {
            return `❌ DADOS ENVIADOS INCORRETOS: NOME:${nome} | EMAIL:${email} | SENHA:${senha}`
        }
        const result = usuarioSchema.safeParse({ nome: nome, email: email, senha: senha });

        if (!result.success) {
            console.log('❌ ERROS NA VALIDAÇÃO:', resultado.error.format());
        } else {
            console.log('✅ DADOS VALIDADOS COM SÚCESSO:', resultado.data);
        }

        console.log('✅ USUARIOS GRAVADOS COM SÚCESSO')
    } catch (error) {
        console.log('❌ ERRO NA TENTATIVA DE GRAVAR USUARIOS:', error);
    }
}