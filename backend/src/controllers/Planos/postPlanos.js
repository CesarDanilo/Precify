const { Planos } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function postPlanos(req, res) {
    const { nome, max_favoritos, max_comparacoes_diarias, pode_salvar_favoritos, preco } = req.body;

    const nomeSchema = z.string().min(3);
    const maxFavoritoSchemas = z.number();
    const maxComparacoesDiariaSchemas = z.number();
    const podeSalvarFavoritoSchemas = z.boolean();
    const precoSchemas = z.number();

    try {
        const result = await Planos.create(data);
        return res.status(200).json({ msg: '✅ Planos listados:', data: result });

    } catch (error) {
        return res.status(500).json({ msg: '❌ ERRO: Não foi possível gravar os planos.', erro: error.message });
    }
}   