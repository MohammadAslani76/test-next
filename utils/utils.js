export const backendUrl = "http://localhost:2024"

export const backendUrlHeader = (token) => {
    if (token){
        return {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    } else {
        return {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }
}