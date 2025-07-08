import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export function TableComponent() {
    const titulos = ['#', 'Nome', 'Email', 'Plano', 'Status', 'Tentativas Gratuitas', 'Criado em', 'Atualizado em', 'Ações'];
    const dados = [
        {
            id: '1a2b3c4d',
            nome: 'João Silva',
            email: 'joao@gmail.com',
            senha: 'senha123',
            plano_id: 'planoA',
            status: true,
            tentativas_gratis_restantes: 3,
            createdAt: new Date('2025-07-01T10:00:00')
        },
        {
            id: '2b3c4d5e',
            nome: 'Maria Oliveira',
            email: 'maria@gmail.com',
            senha: 'senha456',
            plano_id: null,
            status: false,
            tentativas_gratis_restantes: 0,
            createdAt: new Date('2025-07-02T11:30:00')
        },
        {
            id: '3c4d5e6f',
            nome: 'Carlos Santos',
            email: 'carlos@gmail.com',
            senha: 'senha789',
            plano_id: 'planoB',
            status: true,
            tentativas_gratis_restantes: 1,
            createdAt: new Date('2025-07-03T09:45:00')
        },
        {
            id: '4d5e6f7g',
            nome: 'Ana Paula',
            email: 'ana@gmail.com',
            senha: 'senha321',
            plano_id: null,
            status: true,
            tentativas_gratis_restantes: 2,
            createdAt: new Date('2025-07-04T14:20:00')
        },
        {
            id: '5e6f7g8h',
            nome: 'Ricardo Lima',
            email: 'ricardo@gmail.com',
            senha: 'senha654',
            plano_id: 'planoC',
            status: false,
            tentativas_gratis_restantes: 0,
            createdAt: new Date('2025-07-05T08:10:00')
        },
    ];

    return (
        <div className="w-full overflow-x-auto rounded-2xl shadow-lg border border-gray-00 bg-white">
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
                        <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 text-gray-700">{data.id}</td>
                            <td className="px-6 py-4 text-gray-900">{data.nome}</td>
                            <td className="px-6 py-4 text-gray-700">{data.email}</td>
                            <td className="px-6 py-4 text-gray-600">
                                {data.plano_id ? data.plano_id : "Grátis"}
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${data.status
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {data.status ? 'Ativo' : 'Inativo'}
                                </span>
                            </td>
                            <td className="text-center align-middle whitespace-nowrap text-gray-700">
                                {data.tentativas_gratis_restantes}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{data.telefone}</td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(data.createdAt).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                    {/* Botão Editar */}
                                    <button
                                        type="button"
                                        aria-label="Editar"
                                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </button>

                                    {/* Botão Deletar */}
                                    <button
                                        type="button"
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
    )
}