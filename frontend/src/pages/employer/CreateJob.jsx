import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/forms/InputField";
import api from "../../api/axios";

const CreateJob = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    company: "",
    description: "",
    location: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company is required"),
    description: Yup.string().required("Job description is required"),
    location: Yup.string().required("Location is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      await api.post("/jobs", values, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      toast.success("Job created successfully!");
      resetForm();
      navigate("/employer/my-jobs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Post a New Job</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <InputField name="title" label="Job Title" />
            <InputField name="company" label="Company Name" />
            <InputField name="description" label="Job Description" />
            <InputField name="location" label="Location" />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
            >
              {isSubmitting ? "Creating..." : "Create Job"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateJob;
