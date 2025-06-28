const { Produtos } = require('../../database/models/');
const { Op } = require('sequelize');

module.exports = async function getProdutos(req, res) {
    const { id, nome } = req.query;

    try {
        const result = await Produtos.findByPk(id);
        if (!result) return res.status(500).json({ msg: `ESSE PRODUTOS COM ID [${id}] NÃO EXISTE!: ${error}` });

        let where = {};
        if (id) where.id = id;
        if (nome) where.nome = { [Op.iLike]: `%${nome}%` };

        const listaProdutos = await Produtos.findAll({
            where,
            attributes: ['id', 'nome', 'descricao', 'preco', 'imagem', 'createdAt', 'updatedAt']
        });
        if (listaProdutos.length === 0) return res.status(200).json({ msg: `NÃO POSSUI PRODUTOS CADASTRADOS!` });

        return res.status(200).json({ msg: `✅ PRODUTO LISTADO`, data: listaProdutos })

    } catch (error) {
        return res.status(500).json({ msg: `NÃO FOI POSSIVEL LISTAR OS PRODUTOS: ${error}` })
    }
}