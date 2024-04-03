import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

export const options = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {
                    label : "ایمیل",
                    type : "text",
                    placeholder : "ایمیل"
                },
                password : {
                    label : "کلمه عبور",
                    type : "text",
                    placeholder : "کلمه عبور"
                }
            },
            async authorize(credentials){
                const {data} = await axios.post("http://localhost:2024/users/login",credentials,{
                    headers : {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })

                if (data.result && data.user){
                    return {
                        ...data.user,
                        additionalData: {
                            ...data.user
                        }
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({token,user}) {
            return {...token,...user};
        },
        async session(session) {
            session.session.expires = new Date(Date.now() + 50000000000)
            return session;
        }
    },
    pages : {
        signIn : "/auth/login",
        signOut : "/auth/signout"
    }
}