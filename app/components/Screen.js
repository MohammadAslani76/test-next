"use client"

import Navbar from "@/app/components/Navbar";

const Screen = ({children}) => {
    return (
        <>
            <Navbar/>
            <main className="p-4 bg-gray-800 text-white h-[calc(100vh-60px)]">
                {children}
            </main>
        </>
    );
};

export default Screen;