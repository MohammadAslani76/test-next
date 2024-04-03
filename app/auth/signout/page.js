"use client"
import {signOut, useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

const SignOut = () => {

    const router = useRouter()

    const {data:session} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("/api/auth/signin")
        }
    })

    return (
        <div className="p-2 bg-gray-800 text-white h-screen overflow-y-auto flex items-center justify-center">
            <div className="min-w-72 md:min-w-96 border-2 border-gray-300 rounded-lg p-4 shadow-lg shadow-gray-500 flex flex-col gap-6 justify-center items-center">
                <h3 className="font-bold text-xl text-indigo-500">
                    آیا از خروج مطمئنید؟
                </h3>
                <div className="flex items-center justify-center gap-4">
                    <button onClick={() => signOut({callbackUrl : "/api/auth/signin"})}
                        className="px-4 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition-all text-black">
                        بله
                    </button>
                    <button onClick={() => router.back()}
                        className="px-4 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 transition-all">
                        خیر
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;