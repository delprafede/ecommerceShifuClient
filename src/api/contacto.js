import instance from "./axios.js"

export const createContactRequest = (contactDescription)=> instance.post("/contacto", contactDescription)
