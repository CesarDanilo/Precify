const { Planos } = require('../../database/models/');
const { v4: uuidv4 } = require('uuid');
const { z } = require('zod');

module.exports = async function postPlanos(req, res) {
    const planoSchema = z.object({
        nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
        max_favoritos: z.number({ invalid_type_error: 'max_favoritos deve ser número' }),
        max_comparacoes_diarias: z.number({ invalid_type_error: 'max_comparacoes_diarias deve ser número' }),
        pode_salvar_favoritos: z.boolean({ invalid_type_error: 'pode_salvar_favoritos deve ser booleano' }),
        preco: z.number({ invalid_type_error: 'preco deve ser número' })
    });

    const parsed = planoSchema.safeParse(req.body);

    if (!parsed.success) {
        const erros = parsed.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return res.status(400).json({
            msg: '❌ Erros na validação dos dados:',
            erros: erros
        });
    }
    parsed.data.id = uuidv4();
    try {
        const novoPlano = await Planos.create(parsed.data);
        return res.status(201).json({ msg: '✅ Plano criado com sucesso', data: novoPlano });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: '❌ ERRO: Não foi possível gravar o plano.',
            erro: error.message
        });
    }
}
