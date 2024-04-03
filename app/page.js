"use client"
import Link from "next/link";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Home() {

    const {data:session} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("api/auth/signin")
        }
    })
    if (session){
        console.log("session",session.token)
    }
    return (
        <main className="p-2 bg-gray-800 text-white h-screen">
            <Link href="/api/auth/signin">
                ورود
            </Link>
            <Link href="/api/auth/signout">
                خروج
            </Link>
        </main>
    );
}
