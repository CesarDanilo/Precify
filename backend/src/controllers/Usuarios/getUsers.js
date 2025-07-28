const { Usuarios } = require('../../database/models/');
const { Op } = require('sequelize');

const getUsers = async (req, res) => {
    const { id, email, cpfCnpj, telefone } = req.query;

    try {
        const where = {};

        if (id) where.id = id;
        if (email) where.email = { [Op.iLike]: `%${email}%` };
        if (cpfCnpj) where.cpfCnpj = { [Op.iLike]: `%${cpfCnpj}%` };
        if (telefone) where.telefone = { [Op.iLike]: `%${telefone}%` };

        const result = await Usuarios.findAll({
            where,
            attributes: [
                'id',
                'nome',
                'email',
                'cpfCnpj',
                'telefone',
                'endereco',
                'plano_id',
                'status',
                'tentativas_gratis_restantes',
                'createdAt',
                'updatedAt'
            ],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({ data: result });

    } catch (error) {
        console.error('❌ Erro ao buscar usuários:', error);
        return res.status(400).json({
            msg: '❌ Erro ao tentar listar usuários',
            erro: error.message
        });
    }
};

module.exports = getUsers;
