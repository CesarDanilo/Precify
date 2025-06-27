const { Planos } = require('../../database/models/');

module.exports = async function getPlanos(req, res) {
    const { id, nome } = req.query; // Use query params para filtros (ex: /planos?id=1)

    try {
        let where = {};
        if (id) where.id = id;
        if (nome) where.nome = nome;

        const result = await Planos.findAll({
            where,
            attributes: ['id', 'nome', 'max_favoritos', 'max_comparacoes_diarias', 'pode_salvar_favoritos', 'preco', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });

        if (result.length === 0) {
            return res.status(404).json({ msg: 'Nenhum plano encontrado.' });
        }

        return res.status(200).json({ msg: '✅ Planos listados:', data: result });

    } catch (error) {
        console.error('Erro ao listar planos:', error);
        return res.status(500).json({ msg: '❌ ERRO: Não foi possível listar os planos.', erro: error.message });
    }
}
