import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/forms/InputField";
import api from "../../api/axios";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    company: "",
    description: "",
    location: "",
    category: "",
    salary: "",
    jobLevel: "",
    applicationDeadline: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company is required"),
    description: Yup.string().required("Job description is required"),
    location: Yup.string().required("Location is required"),
    category: Yup.string().required("Category is required"),
    salary: Yup.string(),
    jobLevel: Yup.string(),
    applicationDeadline: Yup.date(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      await api.put(`/jobs/${id}`, values, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      toast.success("Job updated successfully!");
      navigate("/employer/my-jobs");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update job");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchJob = async (setValues) => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setValues({
        title: res.data.title,
        company: res.data.company,
        description: res.data.description,
        location: res.data.location,
        category: res.data.category || "",
        salary: res.data.salary || "",
        jobLevel: res.data.jobLevel || "",
        applicationDeadline: res.data.applicationDeadline
          ? new Date(res.data.applicationDeadline).toISOString().slice(0, 16)
          : "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load job data");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Job</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues, isSubmitting }) => {
          // fetch job once
          if (values.title === "") fetchJob(setValues);

          return (
            <Form className="space-y-4">
              <InputField name="title" label="Job Title" />
              <InputField name="company" label="Company Name" />
              <InputField
                name="description"
                label="Job Description"
                component="textarea"
                rows={6}
                placeholder="Write full job description here..."
              />
              <InputField name="location" label="Location" />
              <InputField name="category" label="Category" />
              <InputField name="salary" label="Salary" />
              <InputField name="jobLevel" label="Job Level" />
              <input
                type="datetime-local"
                name="applicationDeadline"
                value={values.applicationDeadline}
                onChange={(e) =>
                  setValues({ ...values, applicationDeadline: e.target.value })
                }
                className="border rounded p-2 w-full"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full ${
                  isSubmitting ? "loading" : ""
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Job"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditJob;
