"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

const Navbar = () => {

    const currentPath = usePathname();

    return (
        <nav className="p-4 shadow-xl shadow-gray-100 flex items-center justify-between gap-4 bg-gray-700 text-white">
            <Link href="/" className="text-lg text-indigo-300">
                سایت تاپلرن
            </Link>
            <div className="flex items-center justify-center gap-4">
                <Link href="/" className={`text-sm md:text-base transition-all ${currentPath === "/" ? "text-green-300 hover:text-green-500" : "hover:text-gray-300"}`}>
                    صفحه اصلی
                </Link>
                <Link href="/my-blogs" className={`text-sm md:text-base transition-all ${currentPath === "/my-blogs" ? "text-green-300 hover:text-green-500" : "hover:text-gray-300"}`}>
                    بلاگ های من
                </Link>
            </div>
            <Link href="/api/auth/signout" className="text-red-500 text-sm">
                خروج
            </Link>
        </nav>
    );
};

export default Navbar;