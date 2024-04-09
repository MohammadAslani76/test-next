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

export const backendUrlFormDataHeader = (token) => {
    return {
        accept: "application/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }
}

export const _imageEncode = (arrayBuffer) => {
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer), function (p, c) {
        return p + String.fromCharCode(c)
    }, ''))
    let mimetype = "image/jpeg"
    return "data:" + mimetype + ";base64," + b64encoded
}