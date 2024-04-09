"use client"

import {useSession} from "next-auth/react";
import {redirect,useRouter} from "next/navigation";
import LoadingPage from "@/app/components/LoadingPage";
import {useEffect, useState} from "react";
import axios from "axios";
import {backendUrl, backendUrlHeader} from "@/utils/utils";
import Link from "next/link";
import Screen from "@/app/components/Screen";
import Modal from "@/app/components/Modal";
import {toast} from "react-toastify";

const Blog = ({params}) => {

    const {data:session,status} = useSession({
        required : true,
        onUnauthenticated(){
            redirect("api/auth/signin")
        }
    })

    const router = useRouter()

    const [blog,setBlog] = useState(null)
    const [openModal,setOpenModal] = useState(false)

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

    const deleteBlog = async () => {
        try {
            const {data} = await axios.delete(`${backendUrl}/blogs/${params._id}`,{
                headers : backendUrlHeader(session.token.token)
            })
            if (data.result){
                toast.info("بلاگ با موفقیت حذف شد")
                router.push("/my-blogs")
            } else {
                toast.error("مشکلی پیش آمده است")
                setOpenModal(false)
            }
        } catch (err){
            console.log(err.message)
            toast.error("ارتباط با سرور برقرار نشد")
            setOpenModal(false)
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
        <Screen>
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
                <div className="flex items-center justify-center gap-3">
                    {
                        session?.token._id === blog.userId &&
                        <>
                            <Link href={`/edit-blog/${blog._id}`}
                                  className="px-3 py-2 bg-orange-500 text-white rounded-lg transition-all hover:bg-orange-400">
                                ویرایش
                            </Link>
                            <button className="px-3 py-2 bg-red-600 text-white rounded-lg transition-all hover:bg-red-500"
                                    onClick={() => setOpenModal(true)}>
                                حذف
                            </button>
                            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                                <p className="my-4">آیا از حذف بلاگ مطمئنی؟</p>
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-3 py-2 bg-red-600 text-white rounded-lg transition-all hover:bg-red-500"
                                            onClick={deleteBlog}>
                                        بله
                                    </button>
                                    <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400"
                                            onClick={() => setOpenModal(false)}>
                                        خیر
                                    </button>
                                </div>
                            </Modal>
                        </>
                    }
                    <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400"
                            onClick={() => router.back()}>
                        بازگشت
                    </button>
                </div>
            </div>
        </Screen>
    );
};

export default Blog;