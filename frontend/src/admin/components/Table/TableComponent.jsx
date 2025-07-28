import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { functionFetchPlanos } from '../../functions/functionFetchPlanos';
import { useState, useEffect } from 'react';
import { UserDeleteDialog } from '../Dialogs/UserDeleteDialog';
import { UserUpdateDialog } from '../Dialogs/UserUpdateDialog';

export function TableComponent({ dados, openDeleteDialog, setOpenDeleteDialog, openUpdateDialog, setOpenUpdateDialog }) {
    const titulos = ['Nome', 'Email', 'cpfCnpj', 'telefone', 'endereco', 'Plano', 'Status', 'Tentativas Gratuitas', 'Criado em', 'Ações'];
    const [planos, setPlanos] = useState([]);
    const [idToDelete, setIdToDelete] = useState(null);
    const [idToUpdate, setIdToUpdate] = useState(null);

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                const planos = await functionFetchPlanos();
                setPlanos(planos);
                console.log("Planos fetched successfully:", planos);
            } catch (error) {
                console.error("Error fetching planos:", error);
            }
        };
        fetchPlanos();
    }, []);

    function handleOpenDeleteDialog(id) {
        setOpenDeleteDialog(true);
        setIdToDelete(id);
    }

    function handleCloseDeleteDialog() {
        setOpenDeleteDialog(false);
        setIdToDelete(null);
    }

    function handleOpenUpdateDialog(id) {
        setOpenUpdateDialog(true);
        setIdToUpdate(id);
    }

    function handleCloseUpdateDialog() {
        setOpenUpdateDialog(false);
        setIdToUpdate(null);
    }

    return (
        <div className="w-full overflow-x-auto rounded-2xl shadow-lg bg-white">
            {openDeleteDialog && <UserDeleteDialog id={idToDelete} handleCloseDeleteDialog={handleCloseDeleteDialog} />}
            {openUpdateDialog && <UserUpdateDialog id={idToUpdate} handleCloseUpdateDialog={handleCloseUpdateDialog} />}
            <table className="min-w-full text-sm text-black">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        {titulos.map((titulo, index) => (
                            <th
                                key={index}
                                className="py-4 px-6 text-left font-medium tracking-wide text-gray-600 whitespace-nowrap uppercase"
                            >
                                {titulo}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {dados.map((data, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 text-gray-900">{data.nome}</td>
                            <td className="px-6 py-4 text-gray-700">{data.email}</td>
                            <td className="px-6 py-4 text-gray-700">{data.cpfCnpj || '-'}</td>
                            <td className="px-6 py-4 text-gray-700">{data.telefone || '-'}</td>
                            <td className="px-6 py-4 text-gray-700">{data.endereco || '-'}</td>
                            <td className="px-6 py-4 text-gray-700">
                                {planos.length > 0
                                    ? planos.find(plano => plano.id === data.plano_id)?.nome || 'Plano não encontrado'
                                    : 'Carregando planos...'}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${data.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {data.status ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center text-gray-700">{data.tentativas_gratis_restantes}</td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(data.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleOpenUpdateDialog(data.id)}
                                        aria-label="Editar"
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleOpenDeleteDialog(data.id)}
                                        aria-label="Deletar"
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
