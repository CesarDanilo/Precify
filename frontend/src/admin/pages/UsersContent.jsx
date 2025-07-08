import { ButtonAdd } from "../components/Buttons/buttonsAdd";
import { TableComponent } from "../components/Table/TableComponent";
import { UserCreateDialog } from "../components/Dialogs/UserCreateDialog";
import { useEffect, useState } from "react";
import { fetchUsers } from "../functions/functionFetchUsers";

export function UsersContent() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const onclose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                console.log(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        getUsers();
    }, [])

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