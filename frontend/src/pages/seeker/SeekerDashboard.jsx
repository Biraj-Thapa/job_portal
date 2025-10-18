import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/jobs/JobCard";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

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

  const handleApply = (jobId) => navigate(`/seeker/jobs/${jobId}/apply`);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Search className="text-blue-600" /> Available Jobs
        </h2>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeekerDashboard;
