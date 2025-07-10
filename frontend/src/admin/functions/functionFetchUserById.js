import axios from 'axios';

export function fetchUsersById({ id }) {
    return axios.get(`http://localhost:4444/api/usuarios/getUsers/?id=${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}
