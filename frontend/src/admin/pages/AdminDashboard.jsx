import { MainContent } from "../components/MainContent"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react";

export function AdminDashboard() {
    const [selectItem, setSelectItem] = useState('dashboard');
    return (
        <div className="flex h-screen">
            <Sidebar setSelectItem={setSelectItem} />
            <MainContent selectItem={selectItem} />
        </div>
    )
}