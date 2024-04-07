"use client"

import {useSession} from "next-auth/react";
import {redirect,useRouter} from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";
import Navbar from "@/app/components/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {backendUrl, backendUrlHeader} from "@/utils/utils";

const Blog = ({params}) => {

    const {data:session,status} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("api/auth/signin")
        }
    })

    const router = useRouter()

    const [blog,setBlog] = useState(null)

    const getBlog = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/blogs/${params._id}`,{
                headers : backendUrlHeader(session.token.token)
            })
            if (data.result){
                setBlog(data.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (session){
            getBlog()
        }
    },[status])

    if (status === "loading" || blog === null){
        return (
            <LoadingPage/>
        )
    }

    return (
        <>
            <Navbar/>
            <main className="p-4 bg-gray-800 text-white h-[calc(100vh-60px)]">
                <div className="flex flex-col justify-center items-center gap-6">
                    <img src={blog.url} alt={blog.title} className="size-72 object-contain"/>
                    <div className="px-2 text-lg flex items-center justify-center font-bold">
                        <span className="ml-1 text-indigo-300">عنوان:</span>
                        <span className="text-gray-300">{blog.title}</span>
                    </div>
                    <div className="px-2 pb-2">
                        <span className="ml-1 text-indigo-300">متن:</span>
                        <span>{blog.text}</span>
                    </div>
                    <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400"
                            onClick={() => router.back()}>
                        بازگشت
                    </button>
                </div>
            </main>
        </>
    );
};

export default Blog;