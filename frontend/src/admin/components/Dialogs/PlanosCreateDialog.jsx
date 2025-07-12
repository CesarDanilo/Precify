import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { functionCreatePlano } from '../../functions/functionCreatePlano'; // você precisa criar essa função no backend

export function PlanosCreateDialog({ onclose }) {
    const [nome, setNome] = useState('');
    const [maxFavoritos, setMaxFavoritos] = useState(0);
    const [maxComparacoesDiarias, setMaxComparacoesDiarias] = useState(0);
    const [podeSalvarFavoritos, setPodeSalvarFavoritos] = useState(false);
    const [preco, setPreco] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nome,
            max_favoritos: maxFavoritos,
            max_comparacoes_diarias: maxComparacoesDiarias,
            pode_salvar_favoritos: podeSalvarFavoritos,
            preco: parseFloat(preco)
        };

        try {
            const response = await functionCreatePlano({ dados: data });
            if (response) {
                console.log("Plano criado com sucesso:", response);
                onclose();
            }
        } catch (error) {
            console.error("Erro ao criar plano:", error);
            alert("Não foi possível criar o plano. Tente novamente mais tarde.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-500/20 backdrop-blur-md border border-white/20 w-1/2 h-[90%] p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">Criar Plano</h2>
                    <XMarkIcon onClick={onclose} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1">Nome</label>
                        <input onChange={(e) => setNome(e.target.value)} type="text" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Máx. Favoritos</label>
                        <input onChange={(e) => setMaxFavoritos(Number(e.target.value))} type="number" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Máx. Comparações Diárias</label>
                        <input onChange={(e) => setMaxComparacoesDiarias(Number(e.target.value))} type="number" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input onChange={(e) => setPodeSalvarFavoritos(e.target.checked)} type="checkbox" className="accent-white" />
                        <label>Pode Salvar Favoritos</label>
                    </div>
                    <div>
                        <label className="block mb-1">Preço (R$)</label>
                        <input onChange={(e) => setPreco(e.target.value)} type="number" step="0.01" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <button type="submit" className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-200 transition">
                        Criar Plano
                    </button>
                </form>
            </div>
        </div>
    );
}
