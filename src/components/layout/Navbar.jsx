
import { IconUser } from "@tabler/icons-react";


export default function Navbar({username}) {
  

  return (
    <div className="bg-stone-100 rounded-xl py-3 px-3 flex justify-end ">
      <div className="flex items-center gap-2">
        <p className="text-sm text-stone-900">
          Hi, {username || "Guest"}
        </p>

        <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
          <IconUser className="text-blue-500" />
        </div>
      </div>
    </div>
  );
}