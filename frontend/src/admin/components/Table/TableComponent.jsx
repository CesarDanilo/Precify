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
        <div className="w-full overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-black text-white">
                    <tr>
                        {titulos.map((titulo, index) => (
                            <th
                                key={index}
                                className="py-2 px-6 text-left font-medium text-sm tracking-wide text-white whitespace-nowrap"
                            >
                                {titulo}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {
                        dados.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className="px-4 py-3">{data.id}</td>
                                    <td className="px-4 py-3">{data.nome}</td>
                                    <td className="px-4 py-3">{data.email}</td>
                                    <td className="px-4 py-3">{data.plano_id ? data.plano_id : "Grátis"}</td>
                                    <td className={`${data.status ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}`} >{data.status ? 'Ativo' : 'Inativo'}</td>
                                    <td className="text-center align-middle whitespace-nowrap">{data.tentativas_gratis_restantes}</td>
                                    <td className="px-4 py-3">{data.telefone}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{new Date(data.createdAt).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Botão Editar */}
                                            <button
                                                type="button"
                                                aria-label="Editar"
                                                className="p-2 rounded-md bg-transparent text-black hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>

                                            {/* Botão Deletar */}
                                            <button
                                                type="button"
                                                aria-label="Deletar"
                                                className="p-2 rounded-md bg-transparent text-black hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}