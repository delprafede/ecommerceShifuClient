import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({children}) => {
  const { loading, isAuthenticated } = useAuth();
  // console.log(loading, isAuthenticated);
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) {
    return  <Navigate to="/login" replace />;
  }
  return children;
};
