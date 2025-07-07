import { useState } from "react";
import { MainContent } from "../components/MainContent"
import { Sidebar } from "../components/Sidebar"
export function AdminDashboard() {
    const [selectItem, setSelectItem] = useState('dashboard');
    return (
        <div>
            <Sidebar selectItem={selectItem} setSelectItem={setSelectItem} />
            <MainContent selectItem={selectItem} />
        </div>
    )
}