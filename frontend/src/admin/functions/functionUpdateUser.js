import axios from "axios";

export async function functionUpdateUser({ id, data }) {
    if (!id) {
        throw new Error("ID do usuário é obrigatório.");
    }

    if (!data || typeof data !== 'object') {
        throw new Error("Dados válidos são obrigatórios para atualização.");
    }

    try {
        const response = await axios.put(`http://localhost:4444/api/usuarios/updateUsers/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
}
