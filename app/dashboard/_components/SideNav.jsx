'use client'
import React from "react";
import { LayoutDashboard, BarChart, MessageSquare, CreditCard, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "../../../components/ui/button";
import { Progress } from "@/components/ui/progress"

const SideNav = () => {
    const pathname = usePathname();

    const menuList = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard className="w-5 h-5" />,
            path: "/dashboard"
        },
        {
            name: "Analytics",
            icon: <BarChart className="w-5 h-5" />,
            path: "/dashboard/analytics"
        },
        {
            name: "Responses",
            icon: <MessageSquare className="w-5 h-5" />,
            path: "/dashboard/responses"
        },
        {
            name: "Upgrade",
            icon: <CreditCard className="w-5 h-5" />,
            path: "/dashboard/upgrade"
        },
        {
            name: "Settings",
            icon: <Settings className="w-5 h-5" />,
            path: "/dashboard/settings"
        }
    ];
    return (
        <div className="h-screen border-r border-zinc-800 w-64 fixed left-0 top-0 bg-black pt-20">
            <div className="space-y-4 p-5">
                {menuList.map((menu, index) => {
                    const isActive = pathname === menu.path;

                    return (
                        <Link
                            key={index}
                            href={menu.path}
                        >
                            <div
                                className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                    }`}
                            >
                                {menu.icon}
                                <span className="font-medium text-sm">{menu.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="fixed bottom-0 p-6 w-64">
                <Button className="w-full">+ Create Form</Button>
                <div className="my-7">
                <Progress value={33} />
                <h2 className="text-sm mt-2 text-gray-600"><strong>2</strong> Out of <strong>3</strong> Forms Created</h2>
                <h2 className="text-sm mt-3 text-gray-600">Upgrade your plan for unlimited AI form builder</h2>
                </div>
            </div>
        </div>
    );
};

export default SideNav;