const { Usuarios } = require('../../database/models');

module.exports = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Usuários encontrados com sucesso',
            dados: usuarios,
        });
    } catch (erro) {
        console.error('Erro ao buscar usuários:', erro);
        return res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar usuários',
        });
    }
};
