const { z } = require('zod');
const { Usuarios } = require('../../database/models/');

module.exports = async function validacaoUsuariosExistente(req, res, next) {
    try {
        const { email } = req.body; // CORRIGIDO: res.body -> req.body

        const emailSchema = z.string().email('Email inválido');
        const result = emailSchema.safeParse(email);

        if (!result.success) {
            return res.status(400).json({
                msg: `❌ ERROS NA VALIDAÇÃO:`,
                error: result.error.format()
            });
        }

        const buscarUsuarioExistente = await Usuarios.findOne({ where: { email } });

        if (buscarUsuarioExistente) {
            return res.status(422).json({
                msg: "Já existe um usuário com esse e-mail, por favor utilize outro!"
            });
        }

        next(); // CONTINUA PARA O PRÓXIMO MIDDLEWARE OU CONTROLLER

    } catch (error) {
        return res.status(500).json({
            msg: `❌ ERRO INTERNO: ${error.message}`
        });
    }
};
