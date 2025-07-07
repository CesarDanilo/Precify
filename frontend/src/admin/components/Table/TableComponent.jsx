export function TableComponent() {
    const titulos = ['#', 'Nome', 'Email', 'Telefone', 'Ações'];
    const dados = [
        { id: 1, nome: 'João', email: 'email@gmail.com', telefone: '123456789' }
    ]
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            titulos.map((titulo, index) => {
                                return (
                                    <th key={index}>{titulo}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.nome}</td>
                                    <td>{data.email}</td>
                                    <td>{data.telefone}</td>
                                    <td>
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