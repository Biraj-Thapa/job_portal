import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import api from "../api/axios";
import { User, Lock } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await api.post("/auth/login", values);

      const userData = {
        user: { id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role },
        token: res.data.token,
      };

      dispatch(loginSuccess(userData));
localStorage.setItem("auth", JSON.stringify(userData));
      toast.success("Login successful!");
      resetForm();

      if (res.data.role === "EMPLOYER") navigate("/employer/dashboard");
      else navigate("/seeker/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleLogin}>
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <InputField name="email" type="email" label="Email" Icon={User} />
              <InputField name="password" type="password" label="Password" Icon={Lock} />
              <button type="submit" disabled={isSubmitting} className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-5 text-sm">
          Don’t have an account? <Link to="/register" className="text-blue-500 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
