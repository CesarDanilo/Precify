const { Favoritos } = require('../../database/models/');
const { z } = require('zod');
const { v4: uuidv4, parse } = require('uuid');
const validaIdentificadores = require('../../functions/Favoritos/validaIdentificadores')

module.exports = async function postFavoritos(req, res) {

  const favoritosSchemas = z.object({
    "id_usuario": z.string(),
    "id_produto": z.string()
  })

  const parsed = favoritosSchemas.safeParse(req.body);

  if (!parsed.success) {
    const erros = parsed.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
    return res.status(400).json({
      msg: '❌ Erros na validação dos dados:',
      erros: erros
    });
  }

  const { id_produto, id_usuario } = parsed.data;

  const validaMsg = await validaIdentificadores(id_produto, id_usuario);
  if (validaMsg !== true) {
    return res.status(400).json({ msg: `❌ ${validaMsg}` });
  }
  parsed.data.id = uuidv4();

  try {
    const novoFavorito = await Favoritos.create(parsed.data);
    return res.status(201).json({ msg: '✅ Favorito criado com sucesso', data: novoFavorito });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: '❌ ERRO: Não foi possível gravar o favoritos.',
      erro: error.message
    });
  }
}