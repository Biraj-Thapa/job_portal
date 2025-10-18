import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/jobs/JobCard";
import { useNavigate } from "react-router-dom";

const SeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleApply = (jobId) => {
    navigate(`/seeker/jobs/${jobId}/apply`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Available Jobs</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.length === 0 && <p className="text-muted">No jobs available.</p>}
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={handleApply} />
        ))}
      </div>
    </div>
  );
};

export default SeekerDashboard;
