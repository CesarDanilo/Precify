const { Usuarios, Planos } = require('../../database/models/');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function validacaoUsuarioLogin(req, res, next) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios!" });
    }

    try {
        // Buscar usuário com o plano associado
        const user = await Usuarios.findOne({
            where: { email: email },
            include: [{
                model: Planos,
                as: 'plano', // deve ser o alias usado na associação do Sequelize
                attributes: ['id', 'nome'] // pegar só id e nome do plano
            }]
        });

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

        // Montar dados para enviar - omitindo senha e incluindo plano.nome
        const { senha: _, plano_id, ...userData } = user.toJSON(); // para excluir senha
        const dados = {
            ...userData,
            plano: user.plano || null, // incluir objeto plano com nome e id
            tentativas: user.tentativas_gratis_restantes
        };

        return res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, dados });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ msg: "Erro interno no servidor!" });
    }
}
