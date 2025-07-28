// src/components/UserCreateDialog.jsx
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { functionCreateUser } from '../../functions/functionCreateUsers';
import { functionFetchPlanos } from '../../functions/functionFetchPlanos';

export function UserCreateDialog({ onclose }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [planoId, setPlanoId] = useState('');
    const [status, setStatus] = useState(false);
    const [tentativasGratisRestantes, setTentativasGratisRestantes] = useState(3);
    const [planos, setPlanos] = useState([]);

    useEffect(() => {
        const fetchPlanos = async () => {
            try {
                const planos = await functionFetchPlanos();
                setPlanos(planos);
            } catch (error) {
                console.error("Erro ao buscar planos:", error);
            }
        };
        fetchPlanos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome,
            email,
            senha,
            plano_id: planoId,
            status,
            tentativas_gratis_restantes: tentativasGratisRestantes,
        };

        if (cpfCnpj) data.cpfCnpj = cpfCnpj;
        if (telefone) data.telefone = telefone;
        if (endereco) data.endereco = endereco;

        try {
            const response = await functionCreateUser({ dados: data });
            console.log("Usuário criado:", response);
            onclose();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário. Tente novamente.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-500/20 backdrop-blur-md border border-white/20 w-1/2 h-[90%] p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Criar Usuário</h2>
                    <XMarkIcon onClick={onclose} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1">Nome</label>
                        <input onChange={(e) => setNome(e.target.value)} type="text" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input onChange={(e) => setSenha(e.target.value)} type="password" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">CPF/CNPJ (opcional)</label>
                        <input onChange={(e) => setCpfCnpj(e.target.value)} type="text" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Telefone (opcional)</label>
                        <input onChange={(e) => setTelefone(e.target.value)} type="text" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Endereço (opcional)</label>
                        <input onChange={(e) => setEndereco(e.target.value)} type="text" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Plano</label>
                            <select
                                onChange={(e) => setPlanoId(e.target.value)}
                                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                                value={planoId}
                            >
                                <option value="" disabled>Selecione um plano</option>
                                {planos.map(plano => (
                                    <option key={plano.id} value={plano.id} className="text-gray-900">
                                        {plano.nome} - {plano.preco ? `R$ ${plano.preco}` : 'Grátis'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <input onChange={(e) => setStatus(e.target.checked)} type="checkbox" className="accent-white" />
                            <label>Status (ativo)</label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Tentativas Grátis Restantes</label>
                        <input onChange={(e) => setTentativasGratisRestantes(Number(e.target.value))} type="number" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <button type="submit" className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-200 transition">
                        Criar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
}
