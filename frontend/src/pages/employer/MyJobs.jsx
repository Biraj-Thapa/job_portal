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
      const employerJobs = res.data.filter(job => job.employerId === user.id);
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
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="p-4 border rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/employer/edit-job/${job.id}`)}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="btn btn-sm btn-error"
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
