const { Usuarios } = require('../../database/models/');

module.exports = async function updateUsers(req, res) {
    const { id } = req.params;
    try {

        const result = await Usuarios.findByPk(id);
        if (!result) {
            return res.status(404).json({ msg: `ERRO! O USUSÁRIO: ${id} NÃO EXISTE!` })
        }

        const { nome, email, senha, plano_id, status, tentativas_gratis_restantes } = req.body;

        if (!nome || !email || !plano_id || !status || !tentativas_gratis_restantes) {
            return res.status(500).json({ msg: `DADOS INSERIDOS INVALIDOS ${nome},${email},${plano_id},${senha}, ${tentativas_gratis_restantes},` })
        }

        const data = {
            nome: nome,
            email: email,
            senha: senha || null,
            plano_id: plano_id,
            tentativas_gratis_restantes: tentativas_gratis_restantes
        }

        try {
            const atualizarUsuario = Usuarios.update(data, { where: { id } })
        } catch (error) {
            return res.status(404).json({ msg: 'ERRO! NÃO FOI POSSIVEL ATUALIZAR O USUÁRIO!', erro: error });
        }

        return res.status(201).json({ msg: '✅ USUÁRIO ATUALIZADO COM SÚCESSO!' })

    } catch (error) {
        return res.status(400).json({ msg: 'ERRO! NÃO FOI POSSIVEL ATUALIZAR O USUÁRIO!', error: error })
    }
}