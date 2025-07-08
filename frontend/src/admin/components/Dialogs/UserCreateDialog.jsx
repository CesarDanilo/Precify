import { XMarkIcon } from '@heroicons/react/24/outline';

export function UserCreateDialog({ onclose }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800/70 backdrop-blur-md border border-white/20 w-1/2 h-[90%] p-6 rounded-2xl shadow-xl text-white overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl">Criar usuario</h2>
                    <XMarkIcon onClick={onclose} className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-1">Nome</label>
                        <input type="text" name="nome" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input type="email" name="email" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input type="password" name="senha" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 ">
                        <div className="w-full md:w-1/2">
                            <label className="block mb-1">Plano</label>
                            <select
                                name="plano_id"
                                className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                                defaultValue=""
                            >
                                <option className="text-gray-900" value="" disabled>Selecione um plano</option>
                                <option className="text-gray-900" value="gratis">Grátis</option>
                                <option className="text-gray-900" value="basico">Básico</option>
                                <option className="text-gray-900" value="pro">Pro</option>
                                <option className="text-gray-900" value="empresarial">Empresarial</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 align-middle">
                            <input type="checkbox" name="status" className="accent-white" />
                            <label>Status (ativo)</label>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Tentativas Grátis Restantes</label>
                        <input type="number" name="tentativas_gratis_restantes" className="w-full p-2 rounded bg-white/10 border border-white/20 text-white" />
                    </div>
                    <button type="submit" className="mt-4 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-200 transition">
                        Criar Usuário
                    </button>
                </form>
            </div>
        </div>
    )
}