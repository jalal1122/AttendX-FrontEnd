import { useSelector } from "react-redux";

const useAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return { isLoggedIn };
};

export default useAuth;
