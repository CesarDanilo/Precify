import { ButtonAdd } from "../components/buttons/buttonsAdd";
import { TableComponent } from "../components/Table/TableComponent";
import { UserCreateDialog } from "../components/Dialogs/UserCreateDialog";
import { useState } from "react";

export function UsersContent() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const onclose = () => {
        setOpen(false);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full px-4">
            {
                open && <UserCreateDialog onclose={onclose} />
            }
            <div className="flex w-full justify-end mb-3">
                <ButtonAdd handleOpen={handleOpen} />
            </div>

            <div className="w-full">
                <TableComponent />
            </div>
        </div>
    );
}