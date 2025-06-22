const { Usuarios } = require('../../database/models');

module.exports = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Usuários encontrados com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}