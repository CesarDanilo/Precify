const { Produtos } = require('../../database/models/');
const { z } = require('zod');

module.exports = async function updateProdutos(req, res) {
    const { id } = req.params;

    try {
        // Validação dos dados recebidos com Zod
        const schema = z.object({
            nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(255, 'Nome muito longo'),
            descricao: z.string().max(300, 'Descrição muito longa').optional(),
            preco: z.number({ invalid_type_error: 'Preço deve ser um número' }),
            imagem: z.string().max(255, 'URL da imagem muito longa').optional()
        });

        // Verifica se o produto existe
        const produtoExistente = await Produtos.findByPk(id);
        if (!produtoExistente) {
            return res.status(404).json({ msg: `❌ Não existe um produto com o ID: ${id}` });
        }

        // Valida os dados do corpo da requisição
        const dadosValidos = schema.parse(req.body);

        // Atualiza o produto
        await Produtos.update(dadosValidos, { where: { id } });

        // Retorna o produto atualizado
        const produtoAtualizado = await Produtos.findByPk(id);

        return res.status(200).json({
            msg: '✅ Produto atualizado com sucesso!',
            data: produtoAtualizado
        });

    } catch (error) {
        // Caso o erro seja de validação do Zod, retorna 400
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                msg: '❌ Dados inválidos fornecidos.',
                erros: error.errors
            });
        }

        return res.status(500).json({
            msg: '❌ ERRO: Não foi possível alterar o produto.',
            erro: error.message
        });
    }
}
