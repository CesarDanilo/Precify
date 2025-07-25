import axios from "axios";

export async function loginUser(userData) {
    try {
        const response = await axios.post("http://localhost:4444/api/usuarios/validationUser", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Erro desconhecido ao fazer login." };
    }
}
