const { Usuarios } = require('../../database/models/');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function validacaoUsuarioLogin(req, res, next) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios!" });
    }

    try {
        const user = await Usuarios.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        const checkPassword = await bcrypt.compare(senha, user.senha);
        if (!checkPassword) {
            console.log("Senha incorreta");
            return res.status(422).json({ msg: "Senha incorreta!" });
        }

        // Gera o token JWT
        const secret = process.env.SECRET;
        if (!secret) {
            return res.status(500).json({ msg: "Secret key not defined!" });
        }

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

        const dados = { email: user.email, name: user.nome, userId: user.id, tentativas: user.tentativas_gratis_restantes };

        return res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, dados });

    } catch (erro) {
        // Em caso de erro, retorna uma resposta genérica
        console.error(erro);
        return res.status(500).json({ msg: "Erro interno no servidor!" });
    }

}