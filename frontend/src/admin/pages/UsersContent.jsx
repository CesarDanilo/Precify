import { TableComponent } from "../components/Table/TableComponent";

export function UsersContent() {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full px-4">
                <TableComponent />
            </div>
        </div>
    );
}