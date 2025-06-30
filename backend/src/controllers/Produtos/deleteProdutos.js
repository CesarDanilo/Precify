const { Produtos } = require('../../database/models/');

module.exports = async function deleteProdutos(req, res) {
    const { id } = req.params;
    if (!id) return res.status(500).json({ msg: ` É NECESSARIO UM ID VALIDO! ID:${id}` });

    try {
        const result = await Produtos.findByPk(id);

        if (!result) {
            return res.status(404).json({ msg: `ERRO! PRODUTO COM ID: ${id} NÃO EXISTE!` })
        }

        await Produtos.destroy({ where: { id } });

        return res.status(200).json({ msg: '✅ PRODUTO EXCLUIDO COM SÚCESSO!' });

    } catch (error) {
        return res.status(400).json({ msg: "ERRO NA TENTANTIVA DE DELETAR PRODUTO", erro: error });
    }
}