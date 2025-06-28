const { Produtos } = require('../../database/models/');
const { Op } = require('sequelize');

module.exports = async function getProdutos(req, res) {
    const { id, nome } = req.query;

    try {
        let where = {};
        if (id) where.id = id;
        if (nome) where.nome = { [Op.iLike]: `%${nome}%` };

        const listaProdutos = await Produtos.findAll({
            where,
            attributes: ['id', 'nome', 'descricao', 'preco', 'imagem', 'createdAt', 'updatedAt']
        });

        if (listaProdutos.length === 0) {
            return res.status(404).json({ msg: `❌ NENHUM PRODUTO ENCONTRADO COM OS CRITÉRIOS INFORMADOS.` });
        }

        return res.status(200).json({ msg: `✅ PRODUTOS ENCONTRADOS`, data: listaProdutos });

    } catch (error) {
        return res.status(500).json({ msg: `❌ ERRO AO LISTAR PRODUTOS`, error: error.message });
    }
};
