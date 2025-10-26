import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      const user = JSON.parse(localStorage.getItem("auth"))?.user;
      const employerJobs = res.data.filter((job) => job.employerId === user.id);
      setJobs(employerJobs);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      await api.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      toast.success("Job deleted successfully!");
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  const totalJobs = jobs.length;
  const closedJobs = jobs.filter((job) => job.isClosed).length;
  const activeJobs = totalJobs - closedJobs;
  const totalApplicants = jobs.reduce(
    (sum, job) => sum + (job.applications?.length || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Employer Dashboard
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Total Jobs</p>
          <p className="text-2xl font-bold text-blue-600">{totalJobs}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Active Jobs</p>
          <p className="text-2xl font-bold text-green-600">{activeJobs}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Closed Jobs</p>
          <p className="text-2xl font-bold text-red-600">{closedJobs}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
          <p className="text-sm text-gray-600">Applicants</p>
          <p className="text-2xl font-bold text-yellow-600">
            {totalApplicants}
          </p>
        </div>
      </div>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t posted any jobs yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition duration-200 border"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    job.isClosed
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {job.isClosed ? "Closed" : "Active"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                {job.description}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Applicants: {job.applications?.length || 0}
              </p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() =>
                    navigate(`/employer/edit-job/${job.id}`)
                  }
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
