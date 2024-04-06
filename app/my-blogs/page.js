"use client"

import Navbar from "@/app/components/Navbar";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";

const MyBlogs = () => {

    const {data:session,status} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("api/auth/signin")
        }
    })

    if (status === "loading"){
        return (
            <LoadingPage/>
        )
    }

    return (
        <>
            <Navbar/>
            <main className="p-2 bg-gray-800 text-white h-[calc(100vh-60px)]">
                بلاگ های من
            </main>
        </>
    );
};

export default MyBlogs;