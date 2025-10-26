import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      const employerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

      const mine = res.data
        .filter((job) => job.employer?.id === Number(employerId))
        .map((job) => ({
          ...job,
          applicationCount: job.applications?.length || 0,
          isClosed: job.isClosed,
        }));

      setJobs(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      await api.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Employer Dashboard</h1>
        <Link
          to="/employer/create-job"
          className="btn btn-primary btn-lg hover:scale-105 transition-transform"
        >
          + Post New Job
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 font-semibold">Total Jobs</h2>
          <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 font-semibold">Open Jobs</h2>
          <p className="text-3xl font-bold text-green-600">
            {jobs.filter((job) => !job.isClosed).length}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-gray-500 font-semibold">Closed Jobs</h2>
          <p className="text-3xl font-bold text-red-600">
            {jobs.filter((job) => job.isClosed).length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 && (
          <p className="text-gray-500 text-center mt-10 text-lg">
            You haven’t posted any jobs yet.
          </p>
        )}
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-lg shadow hover:shadow-lg transition border border-gray-200"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-500 mt-1">{job.company}</p>
              <p className="text-gray-400 text-sm mt-1">
                {job.applicationCount} applicant
                {job.applicationCount !== 1 && "s"}
              </p>
              {job.isClosed && (
                <span className="mt-2 inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
                  Closed
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <Link
                to={`/employer/jobs/${job.id}/applications`}
                className="btn btn-outline btn-sm hover:bg-blue-50"
              >
                View Applications
              </Link>
              <Link
                to={`/employer/edit-job/${job.id}`}
                className="btn btn-outline btn-sm hover:bg-yellow-50"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(job.id)}
                className="btn btn-outline btn-error btn-sm hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
