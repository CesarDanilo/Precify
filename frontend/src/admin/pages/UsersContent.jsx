import { ButtonAdd } from "../components/Buttons/buttonsAdd";
import { TableComponent } from "../components/Table/TableComponent";
import { UserCreateDialog } from "../components/Dialogs/UserCreateDialog";
import { useEffect, useState } from "react";
import { fetchUsers } from "../functions/functionFetchUsers";

export function UsersContent() {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    }

    const onclose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data.data);
                console.log("Users fetched successfully:", data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchData();
    }, [open]);

    return (
        <div className="flex flex-col items-center justify-center w-full px-4">
            {
                open && <UserCreateDialog onclose={onclose} />
            }
            <div className="flex w-full justify-end mb-3">
                <ButtonAdd handleOpen={handleOpen} />
            </div>

            <div className="w-full">
                <TableComponent dados={users} />
            </div>
        </div>
    );
}