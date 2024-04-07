import {Inter} from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "@/app/AuthProvider";
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ["latin"]});

const vazir = localFont({
    src: "../public/vazir/Vazir.woff2"
})

export const metadata = {
    title: "سایت بلاگ",
    description: "این سایت اولین سایت بلاگ فارسی است",
};

export default function RootLayout({children}) {
    return (
        <html lang="fa" dir="rtl">
        <body className={vazir.className}>
        <AuthProvider>
            <ToastContainer rtl={true} theme="colored" position="bottom-left" autoClose={2000}/>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
