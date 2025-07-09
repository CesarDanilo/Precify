import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { functionCreateUser } from '../../functions/functionCreateUsers';
import { functionFetchPlanos } from '../../functions/functionFetchPlanos';

export function UserCreateDialog({ onclose }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [planoId, setPlanoId] = useState('');
    const [status, setStatus] = useState(false);
    const [tentativasGratisRestantes, setTentativasGratisRestantes] = useState(3);
    const [planos, setPlanos] = useState([]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data = { nome, email, senha, planoId, status, tentativasGratisRestantes };

        const data = { nome, email, senha, plano_id: planoId, status, tentativas_gratis_restantes: tentativasGratisRestantes };

        try {
            const response = await functionCreateUser({ dados: data });
            if (response) {
                console.log("Usuário criado com sucesso:", response);
                onclose(); // Fecha o modal após a criação do usuário
            }
            onclose();
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Não foi possível criar o usuário. Tente novamente mais tarde.");
        }
        console.log("Dados do usuário a serem criados:", data);
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-500/20 backdrop-blur-md border border-white/20 w-1/2 h-[90%] p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Criar usuario</h2>
                    <XMarkIcon onClick={onclose} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1">Nome</label>
                        <input onChange={(e) => { setNome(e.target.value) }} type="text" name="nome" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input onChange={(e) => { setSenha(e.target.value) }} type="password" name="senha" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 ">
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Plano</label>
                            <select
                                onChange={(e) => { setPlanoId(e.target.value) }}
                                name="plano_id"
                                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                                defaultValue=""
                            >{
                                    planos.map(plano => {
                                        return (
                                            <option key={plano.id} className="text-gray-900" value={plano.id}>
                                                {plano.nome} - {plano.preco ? `R$ ${plano.preco}` : 'Grátis'}
                                            </option>
                                        )
                                    })
                                }
                                {/* <option className="text-gray-900" value="" disabled>Selecione um plano</option>
                                <option className="text-gray-900" value="gratis">Grátis</option>
                                <option className="text-gray-900" value="basico">Básico</option>
                                <option className="text-gray-900" value="pro">Pro</option>
                                <option className="text-gray-900" value="empresarial">Empresarial</option> */}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 align-middle">
                            <input onChange={(e) => setStatus(e.target.checked)} type="checkbox" name="status" className="accent-white" />
                            <label>Status (ativo)</label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Tentativas Grátis Restantes</label>
                        <input onChange={(e) => setTentativasGratisRestantes(Number(e.target.value))} type="number" name="tentativas_gratis_restantes" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <button type="submit" className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-200 transition">
                        Criar Usuário
                    </button>
                </form>
            </div>
        </div>
    )
}