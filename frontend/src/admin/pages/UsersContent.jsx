import { ButtonAdd } from "../components/buttons/buttonsAdd";
import { TableComponent } from "../components/Table/TableComponent";

export function UsersContent() {
    return (
        <div className="flex flex-col items-center justify-center w-full px-4">
            <div className="flex w-full justify-end mb-3">
                <ButtonAdd />
            </div>

            <div className="w-full">
                <TableComponent />
            </div>
        </div>
    );
}