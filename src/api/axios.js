import axios from "axios";
import { DATABASE_API } from "../../config";


const instance = axios.create({
  baseURL: `${DATABASE_API}`,
  withCredentials: true,
});
export default instance;
