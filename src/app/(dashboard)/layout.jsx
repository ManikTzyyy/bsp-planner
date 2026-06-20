"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";


export default function DashboardLayout({ children }) {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();

                setUser(data.user);
            } catch (err) {
                console.error(err);
            }
        };

        getUser();
    }, []);
    return (
        <div className="flex w-full h-screen p-2 gap-2 overflow-hidden">
            <Sidebar></Sidebar>
            <div className="w-full flex flex-col flex-1 gap-2">
                <Navbar username={user?.name}></Navbar>
                <div className="flex-1 bg-stone-100 rounded-xl py-3 px-3 overflow-y-scroll">{children}</div>
            </div>
        </div>
    )
}