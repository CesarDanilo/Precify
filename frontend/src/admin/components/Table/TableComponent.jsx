export function TableComponent() {
    const titulos = ['#', 'Nome', 'Email', 'Telefone', 'Ações'];
    const dados = [
        { id: 1, nome: 'João', email: 'email@gmail.com', telefone: '123456789' },
        { id: 1, nome: 'João', email: 'email@gmail.com', telefone: '123456789' }
    ]
    return (
        <div className="w-5/6">
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
                                    <td className="px-4 py-3">{data.telefone}</td>
                                    <td className="px-4 py-3">
                                        <button>Editar</button>
                                        <button>Excluir</button>
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