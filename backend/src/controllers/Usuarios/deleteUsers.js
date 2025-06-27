const { Usuarios } = require('../../database/models/');

module.exports = async function (req, res) {
    const { id } = req.params;

    try {
        const result = await Usuarios.findByPk(id);

        if (!result) {
            return res.status(404).json({ msg: `ERRO! USUÁRIO COM ID: ${id} NÃO EXISTE!` })
        }

        try {
            const usuarioDeletado = await Usuarios.destroy({ where: { id } });
        } catch (error) {
            return res.status(400).json({ msg: "ERRO NA TENTANTIVA DE DELETAR USUÁRIO APOS VALIDAR QUE USUÁRIO EXISTE!", erro: error });
        }

        return res.status(200).json({ msg: '✅ USUÁRIO EXCLUIDO COM SÚCESSO!' });

    } catch (error) {
        return res.status(400).json({ msg: "ERRO NA TENTANTIVA DE DELETAR USUÁRIO", erro: error });
    }
}