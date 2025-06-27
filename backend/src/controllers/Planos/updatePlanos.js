const { Planos } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function updatePlanos(req, res) {
    const { id } = req.params;

    try {

        const schema = z.object({
            nome: z.string().min(4).optional(),
            max_favoritos: z.number().optional(),
            max_comparacoes_diarias: z.number().optional(),
            pode_salvar_favoritos: z.boolean().optional(),
            preco: z.number().optional(),
        });

        const planoExistente = await Planos.findByPk(id);
        if (!planoExistente) {
            return res.status(404).json({ msg: `❌ Não existe um plano com o ID: ${id}` });
        }
        
        const dadosValidos = schema.parse(req.body);

        await Planos.update(dadosValidos, { where: { id } });

        const planoAtualizado = await Planos.findByPk(id); // retorna os dados atualizados

        return res.status(200).json({
            msg: '✅ Plano atualizado com sucesso!',
            data: planoAtualizado
        });

    } catch (error) {
        return res.status(500).json({
            msg: '❌ ERRO: Não foi possível alterar o plano.',
            erro: error.message
        });
    }
};
