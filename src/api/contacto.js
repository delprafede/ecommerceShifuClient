import instance from "./axios"

export const createContactRequest = (contactDescription)=> instance.post("/contacto", contactDescription)
