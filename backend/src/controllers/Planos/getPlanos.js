const { Planos } = require('../../database/models/');

module.exports = async function getPlanos(req, res) {

    const { id, nome } = req.params;

    try {
        let where = {};
        if (id) where.id = id;
        if (nome) where.nome = nome;

        const result = Planos.findAll({
            where,
            atributes: ['id', 'nome', 'descricao', 'max_favoritos', 'max_comparacoes_diarias', 'pode_salvar_favoritos', 'preco', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({ msg: '✅ Planos listados:', data: result });

    } catch (error) {
        return res.status(404).json({ msg: `❌ ERRO: NÃO FOI POSSIVEL LISTAR OS PLANOS` })
    }
}