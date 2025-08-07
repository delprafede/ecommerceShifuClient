import axios from "./axios";


// eslint-disable-next-line react-refresh/only-export-components
export const registerRequest= (user) => axios.post(`/register`, user)

export const LoguinRequest= (user) => axios.post(`/login`, user)

export const sendEmailRequest= (email) => axios.post(`/sendEmail`, email)

export const updatePasswordRequest= (id,token, user ) => axios.put(`/forgotPassword/${id}/${token}`, user)

export const verifyTokenRequest = () => axios.get( `/verify` ) 


   
