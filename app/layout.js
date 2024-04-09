import localFont from "next/font/local"
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "@/app/AuthProvider";
import {ToastContainer} from "react-toastify";

const vazir = localFont({
    src: "../public/vazir/Vazir.woff2"
})

export const metadata = {
    title: "سایت بلاگ",
    description: "این سایت اولین سایت بلاگ فارسی است",
    icons : {
        icon : "/favicon.ico"
    }
};

export default function RootLayout({children}) {
    return (
        <html lang="fa" dir="rtl">
        <body className={vazir.className}>
        <ToastContainer rtl={true} theme="colored" position="bottom-left" autoClose={2000}/>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
