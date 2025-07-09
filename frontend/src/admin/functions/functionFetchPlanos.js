import axios from "axios";

export function functionFetchPlanos() {
    try {
        return axios.get('http://localhost:4444/api/planos/getPlanos')
            .then(response => {
                if (response.status === 200) {
                    return response.data.data;
                } else {
                    throw new Error("Erro ao buscar planos");
                }
            });
    } catch (error) {
        console.error("Erro ao buscar planos:", error);
        throw new Error("Não foi possível buscar os planos. Tente novamente mais tarde.");
    }
}