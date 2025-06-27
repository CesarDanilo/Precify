const { Planos } = require('../../database/models/');

module.exports = async function deletePlanos(req, res) {
    const { id } = req.params;

    const result = Planos.findByPk(id);
    if (!result) return res.status(500).json({ msg: `NÃO EXISTE UM PLANO COM ESSE ID NO SISTEMA: ${id}` });

    try {
        const deletarPlano = await Planos.destroy({ where: { id } });
        return res.status(201).json({ msg: '✅ Plano deletado com sucesso!' });

    } catch (error) {
        return res.status(500).json({
            msg: '❌ ERRO: Não foi possível deletar o plano.',
            erro: error.message
        });
    }
}