import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PlanosDeleteDialog } from '../Dialogs/PlanosDeleteDialog';
import { useState } from 'react';

export function TableComponentPlanos({ dados = [], setOpenDeleteDialog, setRefresh }) {
    const [idToDelete, setIdToDelete] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const titulos = ['Nome', 'Max Favoritos', 'Max Comparações Diárias', 'Salvar Favoritos?', 'Preço', 'Criado em', 'Ações'];

    function handleDeletePlano(id) {
        setIdToDelete(id);
        setShowDeleteDialog(true);
    }

    function handleCloseDeleteDialog(reload = false) {
        setShowDeleteDialog(false);
        if (reload) setRefresh(prev => !prev); // ✅ força recarregamento
    }

    return (
        <div className="w-full overflow-x-auto rounded-2xl shadow-lg bg-white">
            {showDeleteDialog && (
                <PlanosDeleteDialog id={idToDelete} handleCloseDeleteDialog={handleCloseDeleteDialog} />
            )}
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
                            <td className="px-6 py-4 text-gray-700">{data.max_favoritos}</td>
                            <td className="text-center align-middle whitespace-nowrap text-gray-700">
                                {data.max_comparacoes_diarias}
                            </td>
                            <td className="text-center align-middle whitespace-nowrap text-gray-700">
                                {data.pode_salvar_favoritos ? 'Sim' : 'Não'}
                            </td>
                            <td className="text-center align-middle whitespace-nowrap text-gray-700">
                                R$ {Number(data.preco).toFixed(2).replace('.', ',')}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(data.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        type="button"
                                        aria-label="Editar"
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeletePlano(data.id)}
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
