import axios from "axios";

export async function fetchPlanos() {
    try {
        const response = await axios.get("http://localhost:4444/api/planos/getPlanos");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching planos:", error);
        throw error;
    }
}