import axios from 'axios';

export async function functionCreateUser({ dados }) {
    try {
        const response = await axios.post('http://localhost:4444/api/usuarios/postUsers', dados);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Não foi possível criar o usuário. Tente novamente mais tarde.");
    }
}