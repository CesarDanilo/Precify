import axios from "axios";

export default async function fetchAmazon(product) {
  const url = 'http://localhost:4444/api/parseAmazon/fetchAmazon';
  try {
    const response = await axios.get(url, {
      params: { product }
    });
    console.log(response.data);
    return response.data;
  } catch (erro) {
    console.log("Não foi possível buscar os dados da API");
    console.log(erro);
    return null;
  }
}
