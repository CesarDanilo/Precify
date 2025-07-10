import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { functionFetchPlanos } from '../../functions/functionFetchPlanos';
import { functionUpdateUser } from '../../functions/functionUpdateUser';
import { fetchUsersById } from '../../functions/functionFetchUserById';

export function UserUpdateDialog({ id, handleCloseUpdateDialog }) {
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

        const fetchUserData = async () => {
            try {
                const userData = await fetchUsersById({ id });

                console.log("User data fetched successfully:", userData);

                setNome(userData.nome || '');
                setEmail(userData.email || '');
                setSenha(userData.senha || '');
                setPlanoId(userData.plano_id || '');
                setStatus(userData.status || false);
                setTentativasGratisRestantes(userData.tentativas_gratis_restantes || 3);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (id) {
            fetchPlanos();
            fetchUserData();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome,
            email,
            senha,
            plano_id: planoId,
            status,
            tentativas_gratis_restantes: tentativasGratisRestantes
        };

        await functionUpdateUser({ id, data });
        handleCloseUpdateDialog();
    }

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-500/20 backdrop-blur-md border border-white/20 w-1/2 h-[90%] p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Editar usuário</h2>
                    <XMarkIcon
                        onClick={handleCloseUpdateDialog}
                        className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
                    />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1">Nome</label>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            name="nome"
                            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password"
                            name="senha"
                            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Plano</label>
                            <select
                                value={planoId}
                                onChange={(e) => setPlanoId(e.target.value)}
                                name="plano_id"
                                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                            >
                                <option className="text-gray-900" value="" disabled>
                                    Selecione um plano
                                </option>
                                {planos.map((plano) => (
                                    <option key={plano.id} className="text-gray-900" value={plano.id}>
                                        {plano.nome} - {plano.preco ? `R$ ${plano.preco}` : 'Grátis'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2 align-middle">
                            <input
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                type="checkbox"
                                name="status"
                                className="accent-white"
                            />
                            <label>Status (ativo)</label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Tentativas Grátis Restantes</label>
                        <input
                            value={tentativasGratisRestantes}
                            onChange={(e) => setTentativasGratisRestantes(Number(e.target.value))}
                            type="number"
                            name="tentativas_gratis_restantes"
                            className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-200 transition"
                    >
                        Atualizar Usuário
                    </button>
                </form>
            </div>
        </div>
    );
}
