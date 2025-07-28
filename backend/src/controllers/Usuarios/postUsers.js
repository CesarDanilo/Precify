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

            // Campos novos como opcionais
            cpfCnpj: z.string().min(11, 'CPF ou CNPJ inválido').optional(),
            telefone: z.string().min(8, 'Telefone inválido').optional(),
            endereco: z.string().min(5, 'Endereço inválido').optional(),

            plano_id: z.string().optional().default('6d88452e-0539-4391-b343-95f23c5f24bc'),
            status: z.boolean().optional().default(true),
            tentativas_gratis_restantes: z.number().optional().default(3)
        });

        const validation = usuarioSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                msg: '❌ ERROS NA VALIDAÇÃO',
                erros: validation.error.format()
            });
        }

        const usuario = validation.data;

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
