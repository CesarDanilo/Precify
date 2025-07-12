import axios from 'axios';

export async function functionCreatePlano({ dados }) {
    try {
        const response = await axios.post('http://localhost:4444/api/planos/postPlanos', dados);
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao criar Planos:", error);
        throw new Error("Não foi possível criar o Planos. Tente novamente mais tarde.");
    }
}