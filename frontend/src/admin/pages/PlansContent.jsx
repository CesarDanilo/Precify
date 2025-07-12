import { useState, useEffect } from "react";
import { TableComponentPlanos } from "../components/Table/TableComponentPlanos";
import { functionFetchPlanos } from "../functions/functionFetchPlanos";
import { ButtonAdd } from "../components/Buttons/ButtonsAdd";
import { PlanosCreateDialog } from "../components/Dialogs/PlanosCreateDialog";

export function PlansContent() {
    const [planos, setPlanos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [refresh, setRefresh] = useState(false); // ✅ novo estado para forçar recarga

    const fetchPlanos = async () => {
        try {
            const planos = await functionFetchPlanos();
            setPlanos(planos);
            console.log("Planos carregados:", planos);
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
        }
    };

    useEffect(() => {
        fetchPlanos();
    }, [refresh]); // ✅ Recarrega apenas quando refresh mudar

    return (
        <div>
            {open && (
                <PlanosCreateDialog
                    onclose={() => {
                        setOpen(false);
                        setRefresh(prev => !prev); // ✅ atualiza após criação
                    }}
                />
            )}

            <div className="flex items-center justify-between w-full px-4 mb-6">
                <h1 className="text-2xl font-semibold mb-6">Gerenciar Planos</h1>
                <ButtonAdd handleOpen={() => setOpen(true)} />
            </div>

            <TableComponentPlanos
                dados={planos}
                setOpenDeleteDialog={setOpenDeleteDialog}
                setRefresh={setRefresh} // ✅ passa setRefresh para recarregar após exclusão
            />
        </div>
    );
}
