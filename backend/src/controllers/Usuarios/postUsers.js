const { Usuarios } = require('../../database/models/');
const { v4: uuidv4 } = require('uuid');

const { z } = require('zod');

module.exports = async function postUsers(req, res) {
    try {
        const { nome, email, senha } = req.body;

        const nomeSchema = z.string().min(4, 'Nome é obrigatório');
        const emailSchema = z.string().email('Email inválido');
        const senhaSchema = z.string().min(6, 'Senha deve ter pelo menos 6 caracteres');

        const usuarioSchema = z.object({
            nome: nomeSchema,
            email: emailSchema,
            senha: senhaSchema
        })

        if (!nome || !email || !senha) {
            return res.status(400).json({
                msg: `❌ DADOS ENVIADOS INCORRETOS: NOME:${nome} | EMAIL:${email} | SENHA:${senha}`
            })
        }

        const result = usuarioSchema.safeParse({ nome: nome, email: email, senha: senha });

        if (!result.success) {
            return res.status(400).json({
                msg: `❌ ERROS NA VALIDAÇÃO: ${result.error.format()}`
            })
        }

        console.log(`✅ DADOS VALIDADOS COM SÚCESSO: ${result.data}`);

        const data = {
            id: uuidv4(),
            nome: nome,
            email: email,
            senha: senha,
            plano: 'Grátis',
            status: true,
            tentativas_gratis_restantes: 3
        }

        try {
            let result = await Usuarios.create(data);
            return res.status(200).json({ msg: `✅ USUARIOS GRAVADOS COM SÚCESSO: ${data}` })
        } catch (error) {
            return res.status(400).json({ msg: `❌ ERRO NA TENTATIVA DE GRAVAR USUARIOS: ${data}`, erro: error })
        }

    } catch (error) {
        return res.status(400).json({ msg: `❌ ERRO NA TENTATIVA DE GRAVAR USUARIOS:`, erro: error.message, data: req.body })
    }
}