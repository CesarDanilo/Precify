import axios from "axios";
/**
 * Função para deletar um usuário.
 * @param {Object} params - Parâmetros da função.
 * @param {string} params.id - ID do usuário a ser deletado.
 * @returns {Promise<void>} - Retorna uma Promise que resolve quando o usuário for deletado.
 */
export async function functionDeleteUser({ id }) {
    try {
        const response = await axios.delete(`http://localhost:4444/api/usuarios/deleteUsers/${id}`);
        if (response.status === 200) {
            console.log("Usuário deletado com sucesso:", response.data);
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw new Error("Não foi possível deletar o usuário. Tente novamente mais tarde.");
    }
}