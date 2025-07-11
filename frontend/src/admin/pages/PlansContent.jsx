import { TableComponentPlanos } from "../components/Table/TableComponentPlanos"
import { functionFetchPlanos } from "../functions/functionFetchPlanos"
import { useState, useEffect } from "react";

export function PlansContent() {
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

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Gerenciar Planos</h1>
            <TableComponentPlanos dados={planos} />
        </div>
    )
}