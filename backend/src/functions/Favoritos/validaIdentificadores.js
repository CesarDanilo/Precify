const { Produtos, Usuarios } = require('../../database/models/');

module.exports = async function validaIdentificadores(id_produto, id_usuario) {
  try {
    const [produto, usuario] = await Promise.all([
      Produtos.findByPk(id_produto),
      Usuarios.findByPk(id_usuario)
    ]);

    if (!usuario) {
      return `Não existe o usuário com id: ${id_usuario}`;
    }

    if (!produto) {
      return `Não existe o produto com id: ${id_produto}`;
    }

    return true;

  } catch (error) {
    console.error(`❌ ERRO ao validar identificadores:`, error);
    return `Erro interno ao validar identificadores`;
  }
}
