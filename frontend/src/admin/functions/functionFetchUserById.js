import axios from 'axios';

export async function fetchUsersById({ id }) {
    if (!id) {
        throw new Error('ID do usuário é obrigatório.');
    }

    try {
        const response = await axios.get(`http://localhost:4444/api/usuarios/getUsers/?id=${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
    }
}
