import { ButtonAdd } from "../components/buttons/buttonsAdd";
import { TableComponent } from "../components/Table/TableComponent";
import { UserCreateDialog } from "../components/Dialogs/UserCreateDialog";

export function UsersContent() {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4">
            <UserCreateDialog />
            <div className="flex w-full justify-end mb-3">
                <ButtonAdd />
            </div>

            <div className="w-full">
                <TableComponent />
            </div>
        </div>
    );
}