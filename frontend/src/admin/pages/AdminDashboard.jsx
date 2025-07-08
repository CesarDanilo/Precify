import { MainContent } from "../components/MainContent"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react";

export function AdminDashboard() {
    const [selectItem, setSelectItem] = useState('dashboard');
    return (
        // <div className="flex h-screen ">
        //     <Sidebar setSelectItem={setSelectItem} />
        //     <MainContent selectItem={selectItem} />
        // </div>
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar com largura fixa */}
            <div className="w-64 h-full shrink-0">
                <Sidebar setSelectItem={setSelectItem} />
            </div>

            {/* MainContent ocupa o restante da largura e altura */}
            <div className="flex-1 h-full overflow-auto">
                <MainContent selectItem={selectItem} />
            </div>
        </div>

    )
}