import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getUser = () => {
  const token = Cookies.get("token");
  if (!token) return null;

  const decoded = jwtDecode(token);

  return decoded;
};

export default getUser;
