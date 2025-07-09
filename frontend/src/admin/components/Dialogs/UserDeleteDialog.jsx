import { XMarkIcon } from '@heroicons/react/24/outline';
import { functionDeleteUser } from '../../functions/functionDeleteUser';

export function UserDeleteDialog({ id, handleCloseDeleteDialog }) {

    async function handleDeleteUser() {
        await functionDeleteUser({ id })
            .then(response => {
                console.log("Usuário deletado com sucesso:", response);
                handleCloseDeleteDialog(); // Fecha o modal após a exclusão
            })
            .catch(error => {
                console.error("Erro ao deletar usuário:", error);
                alert("Não foi possível deletar o usuário. Tente novamente mais tarde.");
            });
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-500/90 backdrop-blur-md border border-white/20 w-1/2 p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Deletar usuário</h2>
                    <XMarkIcon onClick={() => { handleCloseDeleteDialog() }} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
                </div>
                <p>Tem certeza que deseja deletar este usuário?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={() => { handleDeleteUser() }} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">Deletar</button>
                    <button onClick={() => { handleCloseDeleteDialog() }} className="ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg">Cancelar</button>
                </div>
            </div>
        </div>
    );
}