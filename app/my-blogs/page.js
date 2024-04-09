"use client"

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";
import Link from "next/link";
import axios from "axios";
import {backendUrl, backendUrlHeader} from "@/utils/utils";
import {useEffect,useState} from "react";
import Screen from "@/app/components/Screen";

const MyBlogs = () => {

    const {data:session,status} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("api/auth/signin")
        }
    })

    const [blogs,setBlogs] = useState([])

    const getAllBlogs = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/blogs/user/blogs`,{
                headers : backendUrlHeader(session.token.token)
            })
            if (data.result){
                setBlogs(data.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (session){
            getAllBlogs()
        }
    },[status])

    if (status === "loading"){
        return (
            <LoadingPage/>
        )
    }

    return (
        <Screen>
            <div className="mb-6 mt-2">
                <Link href="/add-blog"
                    className="px-3 py-2 bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400">
                    افزودن بلاگ
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {
                    blogs.map(blog => (
                        <Link href={`/blog/${blog._id}`} key={blog._id}>
                            <div className="flex flex-col gap-3 rounded bg-gray-700 shadow-md shadow-gray-500">
                                <img src={blog.url} alt="blog_image" className="w-full h-40 object-contain"/>
                                <div className="px-2 text-lg flex items-center justify-center font-bold">
                                    <span className="ml-1 text-indigo-300">عنوان:</span>
                                    <span className="text-gray-300">{blog.title}</span>
                                </div>
                                <div className="px-2 pb-2">
                                    <span className="ml-1 text-indigo-300">متن:</span>
                                    <span>{blog.text}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </Screen>
    );
};

export default MyBlogs;