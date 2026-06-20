"use client"

import { IconUser, IconLogout } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ username }) {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="bg-stone-100 rounded-xl py-3 px-3 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer select-none focus:outline-none hover:opacity-80 transition">
          <p className="text-sm text-stone-900">
            Hi, {username || "Guest"}
          </p>

          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
            <IconUser className="text-blue-500 w-5 h-5" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 mt-1">
          <DropdownMenuLabel className="text-xs text-stone-500 font-normal">
            Account Action
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer focus:bg-blue-50 flex items-center gap-2"
          >
            <IconLogout className="w-4 h-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}