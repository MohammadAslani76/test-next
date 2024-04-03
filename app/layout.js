import {Inter} from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import AuthProvider from "@/app/AuthProvider";

const inter = Inter({subsets: ["latin"]});

const vazir = localFont({
    src: "../public/vazir/Vazir.woff2"
})

export const metadata = {
    title: "سایت تستی نکست",
    description: "اولین سایت تستی فارسی با نکست",
};

export default function RootLayout({children}) {
    return (
        <html lang="fa" dir="rtl">
        <body className={vazir.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
