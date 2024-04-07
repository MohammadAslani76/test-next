"use client"

import Link from "next/link";
import {useEffect, useRef} from "react";
import {useSession} from "next-auth/react";
import {redirect,useRouter} from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";
import {toast} from "react-toastify";
import axios from "axios";
import {backendUrl, backendUrlHeader} from "@/utils/utils";


const Register = () => {

    const fullName = useRef("")
    const email = useRef("")
    const password = useRef("")
    const confirmPassword = useRef("")

    const router = useRouter()

    const {status} = useSession()

    useEffect(() => {
        if (status === "authenticated") {
            return redirect("/")
        }
    },[status])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const submitData = {
                fullName : fullName.current,
                email : email.current,
                password : password.current,
            }
            if (password.current !== confirmPassword.current){
                return toast.error("کلمه عبور با تکرار کلمه عبور یکسان نمی باشد")
            }
            const {data} = await axios.post(`${backendUrl}/users/register`,submitData,{
                headers : backendUrlHeader()
            })
            if (data.result){
                router.push("/api/auth/signin")
                toast.success("با موفقیت ثبت نام شدید")
            } else {
                toast.error("مشکلی پیش آمده است")
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
                <h3 className="font-bold text-xl text-indigo-500">ثبت نام کاربر</h3>
                <div className="w-full">
                    <label htmlFor="registerUsername">نام کاربر:</label>
                    <input type="text" placeholder="نام کاربر" id="registerUsername" name="fullName" required
                           onChange={(e) => fullName.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>

                <div className="w-full">
                    <label htmlFor="registerEmail">ایمیل کاربر:</label>
                    <input type="text" placeholder="ایمیل کاربری" id="registerEmail" name="email" required
                           onChange={(e) => email.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>

                <div className="w-full">
                    <label htmlFor="registerPassword">کلمه عبور:</label>
                    <input type="password" placeholder="کلمه عبور" id="registerPassword" name="password" required
                           onChange={(e) => password.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>
                <div className="w-full">
                    <label htmlFor="registerConfirmPassword">تکرار کلمه عبور:</label>
                    <input type="password" placeholder="تکرار کلمه عبور" id="registerConfirmPassword" name="confirmPassword" required
                           onChange={(e) => confirmPassword.current = e.target.value}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>
                <button type="submit" className="px-3 py-2 w-full bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400">
                    ثبت نام
                </button>
                <Link href="/api/auth/signin" className="text-sm text-indigo-300">
                    ورود به حساب کاربری
                </Link>
            </form>
        </div>
    );
};

export default Register;