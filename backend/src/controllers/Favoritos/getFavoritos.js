const { Favoritos } = require('../../database/models/');
const { Op, where } = require('sequelize');

module.exports = async function getFavoritos(req, res) {
  const { id, nome } = req.query;
  try {

    if (id) where.id = id;
    if (nome) where.nome = { [Op.iLike]: `%${nome}%` };

    const result = await Favoritos.findByPk(id);
    if (!result) return res.status(500).json({ msg: `ERRO AO BUSCAR FAVORITO!` });

    const favoritos = await Favoritos.findAll({
      where,
      attributes: ['id', 'id_usuario', 'id_produto', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    })

    return res.status(200).json({ data: favoritos });
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    return res.status(500).json({ msg: '❌ ERRO: Não foi possível listar os favoritos.', erro: error.message });
  }
}