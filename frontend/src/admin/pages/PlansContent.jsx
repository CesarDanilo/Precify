import { TableComponentPlanos } from "../components/Table/TableComponentPlanos"
import { functionFetchPlanos } from "../functions/functionFetchPlanos"
import { useState, useEffect } from "react";
import { ButtonAdd } from "../components/Buttons/ButtonsAdd";
import { PlanosCreateDialog } from "../components/Dialogs/PlanosCreateDialog";

export function PlansContent() {
    const [planos, setPlanos] = useState([]);
    const [open, setOpen] = useState(false);

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

    function handleOpen() {
        setOpen(true);
    }

    function onclose() {
        setOpen(false);
    }

    return (
        <div>
            {
                open && <PlanosCreateDialog onclose={onclose} />
            }
            <div className="flex items-center justify-between w-full px-4 mb-6">
                <h1 className="text-2xl font-semibold mb-6">Gerenciar Planos</h1>
                <ButtonAdd handleOpen={handleOpen} />
            </div>

            <TableComponentPlanos dados={planos} />
        </div>
    )
}