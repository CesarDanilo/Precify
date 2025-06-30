const { Produtos } = require('../../database/models/');
const { z } = require('zod');
const { v4: uuidv4, parse } = require('uuid');

module.exports = async function postProdutos(req, res) {

    const produtoSchemas = z.object({
        nome: z.string().min(3).max(255),
        descricao: z.string().max(300).optional(),
        preco: z.number(),
        imagem: z.string().max(255).optional()
    });

    try {

        const parsed = produtoSchemas.safeParse(req.body);

        if (!parsed.success) {
            const erros = parsed.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
            return res.status(400).json({
                msg: '❌ Erros na validação dos dados:',
                erros: erros
            });
        }
        
        parsed.data.id = uuidv4();
        try {
            const novoProduto = await Produtos.create(parsed.data);
            return res.status(201).json({ msg: '✅ Produto criado com sucesso', data: novoProduto });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: '❌ ERRO: Não foi possível gravar o plano.',
                erro: error.message
            });
        }

    } catch (error) {
        return res.status(400).json({ msg: 'ERRO NA TENTATIVA DE GRAVAR O PRODUTO!', erro: error.message })
    }
}