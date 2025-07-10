import axios from "axios";

export async function functionUpdateUser({ id, data }) {
    try {
        const response = await axios.put(`http://localhost:4444/api/usuarios/updateUsers/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user for update:", error);
        throw error;
    }
}