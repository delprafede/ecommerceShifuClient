import { useAuth } from "../Context/AuthContext"


const Admin = () => {
  const {user} = useAuth()
 
  return (
    <div>
      <h1>Soy la pagina de admin(privatsse)</h1>
    </div>
  )
}

export default Admin
