const bcrypt = require('bcryptjs');
const { Usuarios } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function updateUsers(req, res) {
    const { id } = req.params;

    // 1. Esquema de validação (pode ser mais completo)
    const schema = z.object({
        nome: z.string().min(4).optional(),
        email: z.string().email().optional(),
        senha: z.string().min(6).optional(),
        plano_id: z.number().int().optional(),
        status: z.boolean([true, false]).optional(),
        tentativas_gratis_restantes: z.number().int().nonnegative().optional()
    });

    try {
        // 2. Verifica se usuário existe
        const usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ msg: `Usuário ${id} não encontrado` });
        }

        // 3. Valida e extrai apenas campos enviados
        const dadosValidos = schema.parse(req.body);

        // 4. Hash da senha, se for atualizar
        if (dadosValidos.senha) {
            dadosValidos.senha = await bcrypt.hash(dadosValidos.senha, 10);
        }

        // 5. Atualiza (apenas campos presentes)
        await Usuarios.update(dadosValidos, { where: { id } });

        return res.status(200).json({
            msg: '✅ Usuário atualizado com sucesso!',
            data: usuario               // opcional: devolve registro atualizado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Erro interno ao atualizar usuário',
            error: error.message
        });
    }
}
