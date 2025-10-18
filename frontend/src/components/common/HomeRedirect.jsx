import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "EMPLOYER") navigate("/employer/dashboard");
      else navigate("/seeker/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return null; // or spinner
};

export default HomeRedirect;
