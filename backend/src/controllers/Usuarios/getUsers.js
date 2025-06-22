const { Usuarios } = require('../../database/models');

module.exports = async (req, res) => {
    try {
        return res.status(200).json({ msg: 'Usuários encontrados com sucesso' });
    } catch (error) {
        return res.status(500).json({ msg: 'Erro ao buscar usuários' });
    }
}