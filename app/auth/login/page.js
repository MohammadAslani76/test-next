"use client"

import { useRouter, redirect} from "next/navigation";
import {useEffect, useRef} from "react";
import {signIn, useSession} from "next-auth/react";
import LoadingPage from "@/app/components/LoadingPage";
import {toast} from "react-toastify";
import Link from "next/link";

const Login = () => {

    const router = useRouter()
    const email = useRef("")
    const password = useRef("")

    const callbackUrl = "/"

    const {status} = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            return redirect(callbackUrl)
        }
    },[status])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await signIn("credentials",{
                email : email.current,
                password : password.current,
                redirect : false,
                callbackUrl
            })
            if (result.ok){
                toast.success("با موفقیت وارد شدید")
                router.push(callbackUrl)
            } else {
                toast.error("نام کاربری یا کلمه عبور اشتباه است")
            }
        } catch (err) {
            console.log(err.message)
            toast.error("ارتباط با سرور برقرار نشد")
        }
    }

    if (status === "loading"){
        return (
            <LoadingPage/>
        )
    }

    return (
        <div className="p-2 bg-gray-800 text-white h-screen overflow-y-auto flex items-center justify-center">
            <form onSubmit={handleSubmit}
                  className="min-w-72 md:min-w-96 border-2 border-gray-300 rounded-lg p-4 shadow-lg shadow-gray-500 flex flex-col gap-6 justify-center items-center">
                <h3 className="font-bold text-xl text-indigo-500">ورود کاربر</h3>
                <div className="w-full">
                    <label htmlFor="loginUsername">نام کاربری:</label>
                    <input type="text" placeholder="نام کاربری" id="loginUsername" name="email" required
                           onChange={(e) => email.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>
                <div className="w-full">
                    <label htmlFor="loginPassword">کلمه عبور:</label>
                    <input type="password" placeholder="کلمه عبور" id="loginPassword" name="password" required
                           onChange={(e) => password.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>
                <button type="submit" className="px-3 py-2 w-full bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400">
                    ورود
                </button>
                <Link href="/auth/register" className="text-sm text-indigo-300">
                    ایجاد حساب کاربری
                </Link>
            </form>
        </div>
    );
};

export default Login;