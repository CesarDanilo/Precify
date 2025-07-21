import axios from "axios";

export default async function functionFetchUserById() {
    
    try {
        const response = await axios.get("",);
    } catch (error) {
        console.log(`NÃO FOI POSSIVEL BUSCAR O USUARIO ${error}`)
    }
}