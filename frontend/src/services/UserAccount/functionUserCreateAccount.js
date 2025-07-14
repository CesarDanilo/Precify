import { axios } from 'axios';

export async function createUserAccount(userData) {
    try {
        const response = await axios.post('http://localhost:4444/api/usuarios/postUsers/', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user account:', error);
        throw error;
    }
}