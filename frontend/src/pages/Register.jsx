import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/forms/InputField";
import RoleSelector from "../components/forms/RoleSelector";
import api from "../api/axios";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
    role: Yup.string().oneOf(["SEEKER", "EMPLOYER"]).required("Role is required"),
  });

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await api.post("/auth/register", values);

      const userData = {
        user: { id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role },
        token: res.data.token,
      };
console.log(values);
      dispatch(loginSuccess(userData));
       localStorage.setItem("auth", JSON.stringify(userData));
      toast.success("Registered successfully!");
      resetForm();

      if (res.data.role === "EMPLOYER") navigate("/employer/dashboard");
      else navigate("/seeker/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <Formik initialValues={{ name: "", email: "", password: "", role: "" }} validationSchema={registerSchema} onSubmit={handleRegister}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-5">
              <InputField name="name" type="text" label="Full Name" Icon={User} />
              <InputField name="email" type="email" label="Email" Icon={Mail} />
              <InputField name="password" type="password" label="Password" Icon={Lock} />

              <div>
                <label className="label"><span className="label-text font-semibold">Role</span></label>
                <RoleSelector value={values.role} onChange={(val) => setFieldValue("role", val)} />
              </div>

              <button type="submit" disabled={isSubmitting} className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}>
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-5 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
