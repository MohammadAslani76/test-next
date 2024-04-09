"use client"

import Screen from "@/app/components/Screen";
import {FaPlus} from "react-icons/fa";
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {_imageEncode, backendUrl, backendUrlFormDataHeader, backendUrlHeader} from "@/utils/utils";
import {toast} from "react-toastify";
import {useDropzone} from "react-dropzone";
import LoadingPage from "@/app/components/LoadingPage";

const AddBlog = () => {

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect("api/auth/signin")
        }
    })

    const router = useRouter()

    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("text", text);
        if (image === null || title === "" || text === ""){
            return toast.error("پر کردن تمام فیلدها الزامی است")
        }
        try {
            const {status} = await axios.post(`${backendUrl}/blogs`, formData, {
                responseType: 'arraybuffer',
                headers: backendUrlFormDataHeader(session.token.token)
            })
            if (status === 201) {
                toast.success("بلاگ با موفقیت ایجاد شد")
                router.push("/my-blogs")
            } else {
                toast.error("مشکلی پیش آمده است")
            }
        } catch (err) {
            console.log(err.message)
            toast.error("ارتباط با سرور برقرار نشد")
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            const binaryStr = reader.result
            const base64 = _imageEncode(binaryStr)
            setImage(base64)
            setFile(acceptedFiles[0])
        }
        reader.readAsArrayBuffer(acceptedFiles[0])
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    if (status === "loading") {
        return (
            <LoadingPage/>
        )
    }

    return (
        <Screen>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-6">
                {
                    image === null ?
                        <div className="border-2 border-indigo-500 rounded size-72"/> :
                        <img src={image} alt="تصویر" className="size-72 object-contain"/>
                }
                <div {...getRootProps()}>
                    <input {...getInputProps()} accept="image/*" multiple={false}/>
                    <div
                        className="border-2 border-dashed border-indigo-500 cursor-pointer rounded p-4 flex items-center gap-2">
                        <FaPlus size={18} color="white"/>
                        <span color="text.secondary">
                            تصویر را آپلود کنید یا بکشید و در اینجا رها کنید
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                    <label htmlFor="addTitle">عنوان:</label>
                    <input type="text" placeholder="عنوان" id="addTitle" required
                           value={title}
                           onChange={(e) => setTitle( e.target.value)}
                           className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1"/>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
                    <label htmlFor="addText">متن:</label>
                    <textarea placeholder="متن" id="addText" required
                              rows="5"
                              value={text}
                              onChange={(e) => setText( e.target.value)}
                              className="bg-transparent border-2 border-indigo-500 rounded-lg outline-0 w-full px-2 py-1 focus:shadow-md focus:shadow-indigo-500 my-1 resize-none"/>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <button type="submit"
                            className="px-3 py-2 bg-green-700 text-white rounded-lg transition-all hover:bg-green-600">
                        افزودن
                    </button>
                    <button type="button"
                            className="px-3 py-2 bg-indigo-500 text-white rounded-lg transition-all hover:bg-indigo-400"
                            onClick={() => router.back()}>
                        بازگشت
                    </button>
                </div>
            </form>
        </Screen>
    );
};

export default AddBlog;