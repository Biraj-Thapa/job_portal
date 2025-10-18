import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      const employerId = JSON.parse(localStorage.getItem("auth"))?.user?.id;

      const mine = res.data
        .filter((job) => job.employer?.id === Number(employerId))
        .map((job) => ({
          ...job,
          applicationCount: job.applications?.length || 0,
        }));

      setJobs(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Jobs</h2>
        <Link to="/employer/create-job" className="btn btn-primary btn-sm">
          Create Job
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 && <p className="text-muted">No jobs posted yet.</p>}
        {jobs.map((job) => (
          <div key={job.id} className="card bg-base-100 shadow-sm p-4">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-muted">
              Applicants: {job.applicationCount}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                to={`/employer/jobs/${job.id}/applications`}
                className="btn btn-outline btn-sm"
              >
                View Applications
              </Link>
              <Link
                to={`/employer/edit-job/${job.id}`}
                className="btn btn-outline btn-sm"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
