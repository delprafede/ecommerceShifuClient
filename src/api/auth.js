import instance from "./axios";



export const registerRequest= (user) => instance.post(`/register`, user)

export const LoguinRequest= (user) => instance.post(`/login`, user)

export const sendEmailRequest= (email) => instance.post(`/sendEmail`, email)

export const updatePasswordRequest= (id,token, user ) => instance.put(`/forgotPassword/${id}/${token}`, user)

export const verifyTokenRequest = () => instance.get( `/verify` ) 


   
