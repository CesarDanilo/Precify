import axios from 'axios';

export async function createUserAccount(userData) {
    try {
        const response = await axios.post('http://localhost:4444/api/usuarios/postUsers/', userData);
        console.log('User account created successfully:', response.data);
        return response.data;
    } catch (error) {
        const errorData = error.response?.data;

        // Verifica se existem erros de validação nos campos
        if (errorData?.erros) {
            const fieldErrors = {};

            for (const field in errorData.erros) {
                const mensagens = errorData.erros[field]?._errors;
                if (mensagens && mensagens.length > 0) {
                    fieldErrors[field] = mensagens.join(', ');
                }
            }

            // Lança os erros organizados por campo
            throw { type: 'validation', errors: fieldErrors };
        }

        // Se não for erro de validação, lança erro genérico
        throw new Error(errorData?.msg || 'Erro ao criar conta');
    }
}
