import axios from 'axios';

export function fetchUsers() {
    return axios.get('http://localhost:4444/api/usuarios/getUsers')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}
