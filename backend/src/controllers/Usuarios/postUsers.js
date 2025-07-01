const { Usuarios } = require('../../database/models/');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { z } = require('zod');

module.exports = async function postUsers(req, res) {
    try {
        const usuarioSchema = z.object({
            nome: z.string().min(4, 'Nome é obrigatório'),
            email: z.string().email('Email inválido'),
            senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
            plano_id: z.number(),
            status: z.boolean(),
            tentativas_gratis_restantes: z.number()
        });

        const validation = usuarioSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                msg: '❌ ERROS NA VALIDAÇÃO',
                erros: validation.error.format()
            });
        }

        const usuario = validation.data;

        console.log('✅ DADOS VALIDADOS COM SUCESSO:', usuario);

        usuario.id = uuidv4();
        usuario.senha = await bcrypt.hash(usuario.senha, 10);

        const novoUsuario = await Usuarios.create(usuario);

        return res.status(200).json({
            msg: '✅ USUÁRIO GRAVADO COM SUCESSO',
            usuario: novoUsuario
        });

    } catch (error) {
        return res.status(500).json({
            msg: '❌ ERRO INTERNO AO TENTAR GRAVAR USUÁRIO',
            erro: error.message,
            dadosRecebidos: req.body
        });
    }
}
